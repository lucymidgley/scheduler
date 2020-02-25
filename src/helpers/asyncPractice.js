function setTimeoutPromise(error) {
  /* Wrapping a function that takes a callback with a Promise */
  return new Promise((resolve, reject) => {
    if (error) {
      /* When an error occurs we reject the Promise */
      reject("Error");
    } else {
      /* This Promise will resolve in 1000ms */
      setTimeout(() => resolve("Data"), 1000);
    }
  });
}

setTimeoutPromise(true /* or false */)
  .then(data => {
    /* Success case */
    console.log(`Promise Resolved with ${data}`);
  })
  .catch(error => {
    /* Failure case */
    console.log(`Promise Rejected with ${error}`);
  });

  async function run() {
    console.log("1. The calm before async");
  
    try {
      const data = await setTimeoutPromise();
  
      console.log(`3. Promise Resolved with ${data}`);
    } catch (error) {
      /* A thrown error will be caught by the try/catch */
      console.log(`3. Promise Rejected with ${error}`);
    }
  }
  
  run().then(() => {
    console.log("4. Use Promises at the top level");
  });
  
  /* This prints immediately after run() is called */
  console.log("2. Careful, this prints before the timeout is complete");
  