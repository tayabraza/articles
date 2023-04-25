document.addEventListener('DOMContentLoaded', function(event){

    document.querySelectorAll('aside .article').forEach( article => {

        article.addEventListener('click', event => {

            const mainArticle = document.querySelector('#main-content .article').innerHTML;
            const currentArticle = event.target.closest('.article').innerHTML;

            document.querySelector('#main-content .article').innerHTML = currentArticle;
            event.target.closest('.article').innerHTML = mainArticle;

        })

    });

    document.querySelector('.hamburger-menu').addEventListener('click', function(event){

        document.querySelectorAll('.hamburger-menu ~ .nav-item').forEach( item => {

            window.getComputedStyle(item).display == 'none' ? item.style.display = 'block' : item.style.display = 'none'

        });

    });

    function csvJSON(csv){

        const lines=csv.split("\r");
        const result = [];
        const headers=lines[0].split(",");
      
        for(let i=1;i<lines.length;i++){
      
            const obj = {};
            const currentline=lines[i].split(",");
      
            for(let j=0;j<headers.length;j++){
                obj[headers[j]] = currentline[j];
            }
      
            result.push(obj);
      
        }
      
        return result; 
    }

    async function fetchCSV(){
        
        const response = await fetch('data/chart-data.csv');
        const textData = await response.text();
        const csvData = csvJSON(textData)

        const data = {
            labels: csvData.map(v=>v.index),
            datasets: [
                {
                    label: 'A',
                    data: csvData.map(v=>v.A)
                },
                {
                    label: 'A_s',
                    data: csvData.map(v=>v.A_s)
                },
                {
                    label: 'B',
                    data: csvData.map(v=>v.B)
                },
                {
                    label: 'B_s',
                    data: csvData.map(v=>v.B_s)
                }
            ]
        }
                
        new Chart(document.getElementById('line-chart'), {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });

    }

    fetchCSV();


});