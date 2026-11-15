export interface ZipEntryInput {
  path: string;
  content: string;
}

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) !== 0 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c >>> 0;
  }
  return table;
})();

export function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) {
    crc = CRC_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function writeUint16LE(view: DataView, offset: number, value: number) {
  view.setUint16(offset, value & 0xffff, true);
}

function writeUint32LE(view: DataView, offset: number, value: number) {
  view.setUint32(offset, value >>> 0, true);
}

/**
 * Builds an uncompressed (STORE) ZIP archive in memory with zero external dependencies.
 */
export function buildZipArchive(entries: ZipEntryInput[]): Uint8Array {
  const encoder = new TextEncoder();
  const localChunks: Uint8Array[] = [];
  const centralChunks: Uint8Array[] = [];
  let offset = 0;

  for (const entry of entries) {
    const cleanPath = entry.path.replace(/^\/+/, '');
    const nameBytes = encoder.encode(cleanPath);
    const dataBytes = encoder.encode(entry.content);
    const checksum = crc32(dataBytes);

    // Local file header (30 bytes + filename)
    const localHeader = new Uint8Array(30 + nameBytes.length);
    const lView = new DataView(localHeader.buffer);
    writeUint32LE(lView, 0, 0x04034b50); // Local file header signature
    writeUint16LE(lView, 4, 20); // Version needed to extract (2.0)
    writeUint16LE(lView, 6, 0x0800); // UTF-8 filename flag
    writeUint16LE(lView, 8, 0); // Compression method: STORE
    writeUint16LE(lView, 10, 0); // Mod time
    writeUint16LE(lView, 12, 0); // Mod date
    writeUint32LE(lView, 14, checksum);
    writeUint32LE(lView, 18, dataBytes.length); // Compressed size
    writeUint32LE(lView, 22, dataBytes.length); // Uncompressed size
    writeUint16LE(lView, 26, nameBytes.length);
    writeUint16LE(lView, 28, 0); // Extra field length
    localHeader.set(nameBytes, 30);

    localChunks.push(localHeader, dataBytes);

    // Central directory header (46 bytes + filename)
    const centralHeader = new Uint8Array(46 + nameBytes.length);
    const cView = new DataView(centralHeader.buffer);
    writeUint32LE(cView, 0, 0x02014b50); // Central directory signature
    writeUint16LE(cView, 4, 20); // Version made by
    writeUint16LE(cView, 6, 20); // Version needed
    writeUint16LE(cView, 8, 0x0800); // UTF-8 filename flag
    writeUint16LE(cView, 10, 0); // STORE
    writeUint16LE(cView, 12, 0); // Mod time
    writeUint16LE(cView, 14, 0); // Mod date
    writeUint32LE(cView, 16, checksum);
    writeUint32LE(cView, 20, dataBytes.length);
    writeUint32LE(cView, 24, dataBytes.length);
    writeUint16LE(cView, 28, nameBytes.length);
    writeUint16LE(cView, 30, 0); // Extra field length
    writeUint16LE(cView, 32, 0); // Comment length
    writeUint16LE(cView, 34, 0); // Disk number start
    writeUint16LE(cView, 36, 0); // Internal attrs
    writeUint32LE(cView, 38, 0); // External attrs
    writeUint32LE(cView, 42, offset); // Relative offset of local header
    centralHeader.set(nameBytes, 46);

    centralChunks.push(centralHeader);
    offset += localHeader.length + dataBytes.length;
  }

  const centralSize = centralChunks.reduce((sum, chunk) => sum + chunk.length, 0);

  // End of central directory record (22 bytes)
  const eocd = new Uint8Array(22);
  const eView = new DataView(eocd.buffer);
  writeUint32LE(eView, 0, 0x06054b50);
  writeUint16LE(eView, 4, 0);
  writeUint16LE(eView, 6, 0);
  writeUint16LE(eView, 8, entries.length);
  writeUint16LE(eView, 10, entries.length);
  writeUint32LE(eView, 12, centralSize);
  writeUint32LE(eView, 16, offset);
  writeUint16LE(eView, 20, 0);

  const totalLength = offset + centralSize + eocd.length;
  const result = new Uint8Array(totalLength);
  let cursor = 0;

  for (const chunk of localChunks) {
    result.set(chunk, cursor);
    cursor += chunk.length;
  }
  for (const chunk of centralChunks) {
    result.set(chunk, cursor);
    cursor += chunk.length;
  }
  result.set(eocd, cursor);

  return result;
}
