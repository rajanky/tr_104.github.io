// PDF data structure: month -> week -> pdf filename
// You can manually update the PDF filenames here for each week
const pdfData = {
    1: { // Month 1
        1: 'week 1.pdf',
        2: 'week 2.pdf',
        3: 'week 3.pdf',
        4: 'week 4.pdf'
    },
    2: { // Month 2
        1: 'week 5.pdf',
        2: 'week 6.pdf',
        3: 'week 7.pdf',
        4: 'week 8.pdf'
    },
    3: { // Month 3
        1: 'week 9.pdf',
        2: 'week 10.pdf',
        3: 'week 11.pdf',
        4: 'week 12.pdf'
    },
    4: { // Month 4
        1: 'week 13.pdf',
        2: 'week 14.pdf',
        3: 'week 15.pdf',
        4: 'week 16.pdf'
    },
    5: { // Month 5
        1: 'week 17.pdf',
        2: 'week 18.pdf',
        3: 'week 19.pdf',
        4: 'week 20.pdf'
    },
    6: { // Month 6
        1: 'week 21.pdf',
        2: 'week 22.pdf',
        3: 'week 23.pdf',
        4: 'week 24.pdf'
    }
};

let currentMonth = null;

function showSection(id) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const homeSection = document.getElementById(id);
    if (homeSection) {
        homeSection.classList.add('active');
    }
    
    // Show month navigation and hide week navigation
    document.getElementById('monthNav').style.display = 'block';
    document.getElementById('weekNav').style.display = 'none';
    
    // Hide all week sections
    const weekSections = document.querySelectorAll('.week-section');
    weekSections.forEach(section => {
        section.style.display = 'none';
    });
}

function showMonth(monthNumber) {
    currentMonth = monthNumber;
    
    // Hide home section
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Hide month navigation and show week navigation
    document.getElementById('monthNav').style.display = 'none';
    document.getElementById('weekNav').style.display = 'block';
    
    // Generate week buttons
    const weekButtons = document.getElementById('weekButtons');
    weekButtons.innerHTML = '';
    
    for (let week = 1; week <= 4; week++) {
        const button = document.createElement('a');
        button.href = '#';
        button.textContent = `Week ${week}`;
        button.onclick = () => showWeek(monthNumber, week);
        weekButtons.appendChild(button);
    }
    
    // Generate week sections if they don't exist
    generateWeekSections();
}

function generateWeekSections() {
    const container = document.getElementById('weekSections');
    container.innerHTML = '';
    
    for (let month = 1; month <= 6; month++) {
        for (let week = 1; week <= 4; week++) {
            const section = document.createElement('section');
            section.id = `month${month}-week${week}`;
            section.className = 'section week-section';
            section.style.display = 'none';
            
            const heading = document.createElement('h1');
            heading.textContent = `Month ${month} - Week ${week} Report`;
            
            const pdfContainer = document.createElement('div');
            pdfContainer.className = 'pdf-container';
            
            const iframe = document.createElement('iframe');
            const pdfFile = pdfData[month][week];
            iframe.src = pdfFile;
            
            const note = document.createElement('p');
            note.className = 'pdf-note';
            note.textContent = `PDF: ${pdfFile}`;
            
            pdfContainer.appendChild(iframe);
            section.appendChild(heading);
            section.appendChild(pdfContainer);
            section.appendChild(note);
            
            container.appendChild(section);
        }
    }
}

function showWeek(month, week) {
    // Hide all week sections
    const weekSections = document.querySelectorAll('.week-section');
    weekSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Show selected week section
    const selectedSection = document.getElementById(`month${month}-week${week}`);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
}

function backToMonths() {
    // Hide week navigation and show month navigation
    document.getElementById('weekNav').style.display = 'none';
    document.getElementById('monthNav').style.display = 'block';
    
    // Hide all week sections
    const weekSections = document.querySelectorAll('.week-section');
    weekSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Show home section
    showSection('home');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    generateWeekSections();
});
