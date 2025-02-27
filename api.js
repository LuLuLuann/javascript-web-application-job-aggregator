//  fetching, delete, update functions
//  post (adding), put, get, patch (deleting) requests
// fetch API or Axios
// promises and async/await

// const API_KEY = "https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id={ab4db21d}&app_key={3cefaebd985321c43ca775833167ed99}"

async function fetchJobs() {

  // tried to update to this, but it didn't work
  // async function fetchJobs(keyword="", page=1, count=5) {

  try {
    // next 11 lines don't work: 
    //       const response = await fetch('https://jobicy.com/feed/newjobs');
    //       console.log(response);
    //       const data = await response.text();
    //       console.log(data)
    //       const parser= new DOMParser()
    // const xml = parser.parseFromString(data, "application/xml"); 
    // console.log(xml)
    // const items = xml.querySelectorAll("item");
    //       console.log(parser)
    //       console.log(items);
    //       return data;

    // tried to update the following 2 lines, but it didn't work: 
    // const url = `https://jobicy.com/api/v2/remote-jobs?count=${count}&geo=${geo}&industry=${industry}&page=${page}&keyword=${keyword}`;
    // const response = await fetch(url);

    // Below line works, tried to replace with const url and const response lines above to be able to do API calls based on changing information -- didn't work
    const response = await fetch("https://jobicy.com/api/v2/remote-jobs?count=5&geo=usa&industry=supporting")

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // forEach jobs map over data.jobs and store it in a h3 ---- inside data create a div with innerHTML for each thing
    console.log(response)
    const data = await response.json();

    // tried below --- didn't work
    //     return data.jobs || [];
    //   } catch (error) {
    //     console.error("Error fetching jobs:", error);
    //     return [];
    //   }
    // }

    let jobsContainer = document.getElementById("jobs-container");

    if (!jobsContainer) {
      jobsContainer = document.createElement("div");
      jobsContainer.id = "jobs-container";
      document.body.appendChild(jobsContainer);
    }
    // clear results
    jobsContainer.innerHTML = "";

    //check if data.jobs exists
    if (!data.jobs || data.jobs.length === 0) {
      jobsContainer.innerHTML = "<p>No jobs found.</p>";
      return;
    }

    data.jobs.forEach(job => {
      const jobDiv = document.createElement("div");
      jobDiv.innerHTML = `
    <h4><u>Published on</u>: ${job.pubDate}</h4>
    <h3 class="jobTitle"><u>Job title</u>: ${job.jobTitle}</h3>
    <h4><u>Company name</u>: ${job.companyName}</h4>
    <h4><u>Salary range</u>: ${job.annualSalaryMin} to ${job.annualSalaryMax} ${job.salaryCurrency}</h4>
    <h4><u>Job industry</u>: ${job.jobIndustry}</h4>
    <h4><u>Job type</u>: ${job.jobType}</h4>
    <h4><u>Job level</u>: ${job.jobLevel}</h4>
    <h4><u>Job location</u>: ${job.jobGeo}</h4>
    <h2>Job description:</h2>
    <p> ${job.jobDescription}</p>
    <h4><u>URL</u>: <a href= "${job.url}" target="_blank">Apply here</a></h4>
    <hr>
    `;

      jobsContainer.appendChild(jobDiv);
    });

    // document.body.appendChild(jobsContainer); 
    // console.log(jobsContainer)

    // console.log(data)
    //     } catch (error) {
    //       console.error("Error fetching the RSS feed:", error);
    //       return null;
    //     }
    //   }

    console.log("Fetched jobs:", data.jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
}

fetchJobs();


//   GET https://jobicy.com/api/v2/remote-jobs {
// }

// // links to live jobs
//   https://jobicy.com/api/v2/remote-jobs?count=20&geo=usa&industry=marketing&tag=seo

//   count - Number of listings to return (default: 50, range: 1-50)
// geo - Filter by job region (default: all regions)
// industry - Filter by job category (default: all categories)
// tag - Search by job title and description (default: all jobs)

// dropdown connect to query parameters
// ?feed=job_feed (required)
// &job_categories=... (business, copywriting, supporting, data-science, design-multimedia, admin, accounting-finance, hr, marketing, management, dev, seller, seo, smm, engineering, technical-suppor, web-app-design)
// &job_types=... (full-time, freelance, contract, part-time)
// &search_keywords=... (eg. designer)
// &search_region=... (apac, emea, latam, argentina, australia, austria, belgium, brazil, bulgaria, canada, china, costa-rica, croatia, cyprus, czechia, denmark, estonia, europe, finland, france, germany, greece, hungary, ireland, israel, italy, japan, latvia, lithuania, mexico, netherlands, new-zealand, norway, philippines, poland, portugal, romania, singapore, slovakia, slovenia, south-korea, spain, sweden, switzerland, thailand, turkiye, united-arab-emirates, uk, usa, vietnam)

// example string -- https://jobicy.com/?feed=job_feed&job_categories=supporting&job_types=full-time&search_region=USA 


// tried to add POST method in save a job function -- didn't work -- uncommenting makes all jobs disappear

// export async function saveJob(jobId) {
//   try {
//     const response = await fetch(`https://jobicy.com/api/v2/save-job/${jobId}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ saved: true })
//     });

//     if (!response.ok) {
//       throw new Error("Failed to save job.");
//     }

//     const result = await response.json();
//     console.log("Job saved:", result);
//   } catch (error) {
//     console.error("Error saving job:", error);
//   }
// }
