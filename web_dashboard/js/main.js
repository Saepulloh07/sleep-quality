// Firebase config
const firebaseConfig = {
    apiKey: "your_api_key",
    authDomain: "your_auth_domain",
    databaseURL: "your_database_url",
    projectId: "your_project_id",
    storageBucket: "your_storage_bucket",
    messagingSenderId: "your_messaging_sender_id",
    appId: "your_app_id"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  const ctx = document.getElementById('sleepChart').getContext('2d');
  const sleepChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Snore Level',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }, {
        label: 'Motion Level',
        data: [],
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }, {
        label: 'Triggers',
        data: [],
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  
  function updateChart() {
    firebase.database().ref('sleep_data').once('value', (snapshot) => {
      const data = snapshot.val();
      const labels = [];
      const snoreLevels = [];
      const motionLevels = [];
      const triggers = [];
  
      for (const key in data) {
        labels.push(new Date(parseInt(key)).toLocaleTimeString());
        snoreLevels.push(data[key].snore_level);
        motionLevels.push(data[key].motion_level);
        triggers.push(data[key].triggers);
      }
  
      sleepChart.data.labels = labels;
      sleepChart.data.datasets[0].data = snoreLevels;
      sleepChart.data.datasets[1].data = motionLevels;
      sleepChart.data.datasets[2].data = triggers;
      sleepChart.update();
    });
  }
  
  updateChart();
  setInterval(updateChart, 3600000); // Update every 1 hour
  