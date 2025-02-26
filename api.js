//  fetching, delete, update functions
//  post (adding), put, get, patch (deleting) requests
// fetch API or Axios
// promises and async/await

// const API_KEY = "https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id={ab4db21d}&app_key={3cefaebd985321c43ca775833167ed99}"

async function fetchJobs() {
    try {
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
const response = await fetch("https://jobicy.com/api/v2/remote-jobs?count=5&geo=usa&industry=supporting")
// forEach jobs map over data.jobs and store it in a h3 ---- inside data create a div with innerHTML for each thing
console.log(response)
const data = await response.json()
// possibly 26-39 ?
const jobsContainer = document.createElement("div");
data.jobs.forEach(job => {
    const jobDiv = document.createElement("div"); 
    jobDiv.innerHTML = `
    <h3>${jobTitle}</h3>
    <h4>${companyName}</h4>
    <h4>${annualSalaryMin} to ${annualSalaryMax} ${job}<h4>
    <p>Job description: ${jobDescription}</p>
    <p>Job Excerpt: ${jobExcerpt}</p>
    `;
    jobsContainer.appendChild(jobDiv); 
});
document.body.appendChild(jobsContainer); 
console.log(jobsContainer)

console.log(data)
    } catch (error) {
      console.error("Error fetching the RSS feed:", error);
      return null;
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