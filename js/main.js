document.addEventListener('DOMContentLoaded', function(event){

    document.querySelectorAll('aside .article').forEach( article => {

        article.addEventListener('click', event => {

            const mainArticle = document.querySelector('#main-content .article').innerHTML;
            const currentArticle = event.target.closest('.article').innerHTML;

            document.querySelector('#main-content .article').innerHTML = currentArticle;
            event.target.closest('.article').innerHTML = mainArticle;

        })

    })

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
        const response = await fetch('/data/chart-data.csv',{
            headers: {
                "Content-type": "text/csv"
            } 
        });

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

        const lineChart = document.getElementById('line-chart');
                
        new Chart(lineChart, {
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