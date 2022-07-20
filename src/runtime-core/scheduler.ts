
let queue: any[] = [];
let isFlushPending: Boolean = false;

const p = Promise.resolve()
export function nextTick(fn?) {
  return fn ? p.then(fn) : p;
}
export function queueJobs(job) {
  if (!queue.includes(job)) {
    queue.push(job);
  }
  queueFlush();
}

function queueFlush() {
  if (isFlushPending) return
  isFlushPending = true;

  flushJobs();

}

function flushJobs() {
  nextTick(() => {
    isFlushPending = false;
    let job;
    while ((job = queue.shift())) {
      job && job();
    }
  })

}

