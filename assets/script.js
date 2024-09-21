document.getElementById("maincontent").style.width = "96%";
document.getElementById("maincontent").style.display= 'flex';
function openNav() {
    document.getElementById("mySidebar").style.width = "20%";
    document.getElementById("maincontent").style.width = "79%";
  }
  
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0%";
    document.getElementById("maincontent").style.width = "96%";
    document.getElementById("maincontent").style.display= 'flex';
  }

  const totalImages = 132; // Total number of images
const imagesPerPage = 4; // Number of page numbers shown at a time

function loadImage(fileNumber) {
    let imgElement = document.getElementById('page-content');
    let filePath = `./assets/pages/${fileNumber}.png`;

    console.log(`Loading image: ${filePath}`);  // Log the path to be loaded

    imgElement.src = filePath;

    imgElement.onerror = function() {
        console.error(`Failed to load image: ${filePath}`);
        imgElement.src = '';  // Clear the src
        imgElement.alt = `Image ${fileNumber}.png not found`;
    };
}

function changePage(newFileNumber) {
    if (newFileNumber > totalImages) {
        let userChoice = confirm("You have reached the last page. Do you want to review or exit?\nClick OK to review (go to the first page) or Cancel to exit .");
        if (userChoice) {
            // User chose to review
            window.location.href = '/'; // Redirect to the first page
        } else {
            // User chose to exit
            window.location.href = 'https://causmic.gndec.ac.in/team';
        }
        return;
    }

    if (newFileNumber < 1) return;

    console.log(`Changing to image number: ${newFileNumber}`);

    // Update the current file number display
    document.getElementById('currentFileNumber').textContent = newFileNumber;
    
    // Load the new image and update pagination
    loadImage(newFileNumber);
    updatePagination(newFileNumber);
}

function updatePagination(currentPage) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; // Clear previous pagination buttons

    let startPage = Math.floor((currentPage - 1) / imagesPerPage) * imagesPerPage + 1;
    let endPage = Math.min(startPage + imagesPerPage - 1, totalImages);

    // Create Previous button for pagination
    if (startPage > 1) {
        let prevButton = document.createElement('button');
        prevButton.textContent = '«'; // Previous arrow
        prevButton.addEventListener('click', () => changePage(startPage - imagesPerPage));
        paginationContainer.appendChild(prevButton);
    }

    // Create page number buttons
    for (let i = startPage; i <= endPage; i++) {
        let pageButton = document.createElement('button');
        pageButton.textContent = i;
        if (i === currentPage) {
            pageButton.disabled = true; // Highlight the current page
        }
        pageButton.addEventListener('click', () => {
            changePage(i);
        });
        paginationContainer.appendChild(pageButton);
    }

    // Create Next button
    if (endPage < totalImages) {
        let nextButton = document.createElement('button');
        nextButton.textContent = '»'; // Next arrow
        nextButton.addEventListener('click', () => changePage(startPage + imagesPerPage));
        paginationContainer.appendChild(nextButton);
    }
}

// Initial image load and pagination setup
loadImage(1);
updatePagination(1);

// Add event listeners for next and previous buttons
document.getElementById('nextButton').addEventListener('click', function() {
    let currentNumber = parseInt(document.getElementById('currentFileNumber').textContent);
    changePage(currentNumber + 1);
});

document.getElementById('prevButton').addEventListener('click', function() {
    let currentNumber = parseInt(document.getElementById('currentFileNumber').textContent);
    changePage(currentNumber - 1);
});