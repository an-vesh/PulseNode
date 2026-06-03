class MaxHeap {
  constructor() {
    this.heap = [];
  }

  // Helper Methods
  getLeftChildIndex(parentIndex) { return 2 * parentIndex + 1; }
  getRightChildIndex(parentIndex) { return 2 * parentIndex + 2; }
  getParentIndex(childIndex) { return Math.floor((childIndex - 1) / 2); }

  hasLeftChild(index) { return this.getLeftChildIndex(index) < this.heap.length; }
  hasRightChild(index) { return this.getRightChildIndex(index) < this.heap.length; }
  hasParent(index) { return this.getParentIndex(index) >= 0; }

  leftChild(index) { return this.heap[this.getLeftChildIndex(index)]; }
  rightChild(index) { return this.heap[this.getRightChildIndex(index)]; }
  parent(index) { return this.heap[this.getParentIndex(index)]; }

  swap(indexOne, indexTwo) {
    const temp = this.heap[indexOne];
    this.heap[indexOne] = this.heap[indexTwo];
    this.heap[indexTwo] = temp;
  }

  peek() {
    if (this.heap.length === 0) return null;
    return this.heap[0];
  }

  // Remove the max element from the heap
  extractMax() {
    if (this.heap.length === 0) return null;
    const item = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();
    this.heapifyDown();
    return item;
  }

  insert(item) {
    this.heap.push(item);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    // Compare based on triageScore (higher score means higher priority)
    // If scores are equal, we could use admittedAt to favor older patients (FIFO), but for now just score.
    while (this.hasParent(index) && this.parent(index).triageScore < this.heap[index].triageScore) {
      this.swap(this.getParentIndex(index), index);
      index = this.getParentIndex(index);
    }
  }

  heapifyDown() {
    let index = 0;
    while (this.hasLeftChild(index)) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      if (this.hasRightChild(index) && this.rightChild(index).triageScore > this.leftChild(index).triageScore) {
        smallerChildIndex = this.getRightChildIndex(index);
      }

      if (this.heap[index].triageScore > this.heap[smallerChildIndex].triageScore) {
        break;
      } else {
        this.swap(index, smallerChildIndex);
      }
      index = smallerChildIndex;
    }
  }

  // Restore the heap state from an array of patients (used during cold start recovery)
  buildHeap(patients) {
    this.heap = [];
    for (const p of patients) {
      this.insert(p);
    }
  }

  // Return array representing current state
  toArray() {
    // Return a shallow copy of the sorted version (not just the heap array, which isn't strictly sorted)
    // Actually, for UI purposes, they need a sorted list.
    // Creating a temporary heap to extract all elements in order.
    const tempHeap = new MaxHeap();
    tempHeap.heap = [...this.heap];
    const sorted = [];
    while (tempHeap.heap.length > 0) {
      sorted.push(tempHeap.extractMax());
    }
    return sorted;
  }
}

module.exports = MaxHeap;
