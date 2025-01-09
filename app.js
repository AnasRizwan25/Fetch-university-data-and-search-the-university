let allData = [];

let getData = async () => {
  try {
    document.querySelector('#result').innerHTML = '<p>Loading universities...</p>';
    const response = await fetch("http://universities.hipolabs.com/search?country=United+States");
    const data = await response.json();
    allData = data;
    renderAllData();
  } catch (error) {
    console.error("Error fetching data:", error);
    document.querySelector('#result').innerHTML = '<p>Error fetching data. Please try again later.</p>';
  }
};

function renderAllData() {
  const content = document.querySelector("#result");

  if (allData.length > 0) {
    const allHTML = allData.map((uni) => {
      return `
        <div class="box">
          <p><strong>${uni.name}</strong></p>
          <p><a href="${uni.web_pages[0]}" target="_blank">Visit Website</a></p>
          <p>${uni.domains[0]}</p>
        </div>
      `;
    }).join('');
    content.innerHTML = allHTML;
  } else {
    content.innerHTML = '<p>No universities found.</p>';
  }
}

function clear() {
  document.querySelector('#values').value = '';
  renderAllData();
}

function hello() {
  const value = document.querySelector('#values').value;

  if (value.trim() === "") {
    renderAllData();
    return;
  }

  if (allData.length > 0) {
    const result = allData.filter(data => data.name.toLowerCase().includes(value.toLowerCase()));

    if (result.length > 0) {
      const resultHTML = result.map((uni) => {
        return `
          <div class="box">
            <p><strong>${uni.name}</strong></p>
            <p><a href="${uni.web_pages[0]}" target="_blank">Visit Website</a></p>
            <p>${uni.domains[0]}</p>
          </div>
        `;
      }).join('');
      document.querySelector("#result").innerHTML = resultHTML;
    } else {
      document.querySelector('#result').innerHTML = `<p>No university found with the name "${value}".</p>`;
    }
  } else {
    document.querySelector('#result').innerHTML = '<p>Data is still loading. Please wait a moment.</p>';
  }
}

getData();
