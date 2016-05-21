var Database = {

  neo4j: require('neo4j-driver').v1,

  getDriver: function() {
    return Database.neo4j.driver("bolt://localhost", Database.neo4j.auth.basic("neo4j", "admin"));
  },

  getSession: function () {
    return Database.getDriver().session();
  },

  openSession: function () {
    return Database.getSession();
  },

  closeSession: function () {
    Database.getSession().close();
  },

  closeDriver: function () {
    Database.getDriver().close();
  }

};

module.exports = Database;
