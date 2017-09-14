var seeder = require('mongoose-seed');

// Connect to MongoDB via Mongoose 
seeder.connect('mongodb://localhost:27017/MI6Book', function() {
  // Load Mongoose models 
  seeder.loadModels(['./models/agent.js']);
  // Clear specified collections 
  seeder.clearModels(['Agent'], function() {
    // Callback to populate DB once collections have been cleared 
    seeder.populateModels(data);
  });
});

// Data array containing seed data - documents organized by Model 
var data = [
  { 
    'model': 'Agent',
    'documents': [
      {
        'realname': 'James Bond',
        'codename': '007',
        'password': 'password',
        'location': 'London, UK',
        'status': 'Active'
      },
      {
        'realname': 'Edward Donne',
        'codename': '001',
        'password': 'password',
        'location': 'London, UK',
        'status': 'Active'
      },
      {
        'realname': 'Stuart Thomas',
        'codename': '005',
        'password': 'password',
        'location': 'Athens, Greece',
        'status': 'Retired'
      },
      {
        'realname': 'Major Jack Giddings',
        'codename': '006',
        'password': 'password',
        'location': 'Unknown',
        'status': 'MIA'
      },
      {
        'realname': 'Frederick Wardner',
        'codename': '004',
        'password': 'password',
        'location': 'Berlin, Germany',
        'status': 'Deceased'
      }
    ]
  }
];  