import type { BytesLike } from 'ethers';
import { MerkleTree } from '@0glabs/0g-ts-sdk';
import { ethers } from 'ethers';

export interface Iterator {
    next(): Promise<[boolean, Error | null]>;
    hasNext(): boolean;
    current: () => Uint8Array;
}

abstract class AbstractFile {
    fileSize: number = 0;
    
    abstract iterateWithOffsetAndBatch(
        offset: number, 
        batch: number, 
        flowPadding: boolean
    ): Iterator;

    size(): number {
        return this.fileSize;
    }

    iterate(flowPadding: boolean): Iterator {
        return this.iterateWithOffsetAndBatch(0, this.size(), flowPadding);
    }

    async merkleTree(): Promise<[MerkleTree | null, Error | null]> {
        throw new Error('Method not implemented.');
    }

    numChunks(): number {
        throw new Error('Method not implemented.');
    }

    numSegments(): number {
        throw new Error('Method not implemented.');
    }

    async createSubmission(tags: BytesLike): Promise<[any | null, Error | null]> {
        throw new Error('Method not implemented.');
    }

    splitNodes(): number[] {
        throw new Error('Method not implemented.');
    }

    async createNode(offset: number, chunks: number): Promise<[any | null, Error | null]> {
        throw new Error('Method not implemented.');
    }

    async createSegmentNode(offset: number, batch: number, size: number): Promise<[any | null, Error | null]> {
        throw new Error('Method not implemented.');
    }
}

export class BrowserFile extends AbstractFile {
    private file: File;
    
    constructor(file: File) {
        super();
        this.file = file;
        this.fileSize = file.size;
    }

    size(): number {
        return this.file.size;
    }

    iterateWithOffsetAndBatch(offset: number, batch: number, flowPadding: boolean): Iterator {
        let currentOffset = offset;
        let currentData: Uint8Array | null = null;
        
        return {
            current: () => {
                if (!currentData) throw new Error("No current data available");
                return currentData;
            },
            next: async (): Promise<[boolean, Error | null]> => {
                try {
                    if (currentOffset >= this.file.size) {
                        currentData = null;
                        return [false, null];
                    }
                    const slice = this.file.slice(currentOffset, currentOffset + batch);
                    const buffer = await slice.arrayBuffer();
                    currentData = new Uint8Array(buffer);
                    currentOffset += batch;
                    return [true, null];
                } catch (error) {
                    currentData = null;
                    return [false, error as Error];
                }
            },
            hasNext: () => currentOffset < this.file.size
        };
    }

    async merkleTree(): Promise<[MerkleTree | null, Error | null]> {
        try {
            const buffer = await this.file.arrayBuffer();
            const data = new Uint8Array(buffer);
            const hash = ethers.keccak256(data);
            const leaf = {
                hash: hash,
                parent: null,
                left: null,
                right: null,
                isLeftSide: () => false
            };
            const tree = new MerkleTree(leaf);
            return [tree, null];
        } catch (error) {
            return [null, error as Error];
        }
    }

    static async fromFile(file: File): Promise<BrowserFile> {
        return new BrowserFile(file);
    }

    numSegments(): number {
        const SEGMENT_SIZE = 1024 * 1024; // 1MB segments
        return Math.ceil(this.file.size / SEGMENT_SIZE);
    }

    numChunks(): number {
        const CHUNK_SIZE = 256 * 1024; // 256KB chunks
        return Math.ceil(this.file.size / CHUNK_SIZE);
    }

    async createSubmission(tags: BytesLike): Promise<[any | null, Error | null]> {
        try {
            const [tree, err] = await this.merkleTree();
            if (err) return [null, err];
            
            return [{
                root: tree!.rootHash(),
                size: this.size(),
                tags: ethers.hexlify(tags),
                segments: this.numSegments(),
                chunks: this.numChunks()
            }, null];
        } catch (error) {
            return [null, error as Error];
        }
    }
} 