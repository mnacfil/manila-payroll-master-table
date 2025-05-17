var mysql = require("mysql2/promise");
require("dotenv").config();

async function seedDatabase() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306,
    });
    console.log("Starting database seeding...");

    await connection.execute(`
        INSERT INTO \`group\` (id, title) VALUES
        (UUID(), 'Position'),
        (UUID(), 'Department')
      `);
    console.log("Inserted groups");

    const [groups] = await connection.execute("SELECT id, title FROM `group`");
    const groupMap = groups.reduce((acc, group) => {
      acc[group.title] = group.id;
      return acc;
    }, {});

    await connection.execute(
      `
        INSERT INTO \`option\` (id, code_id, name, description, group_id) VALUES
        (UUID(), 'dev', 'Developer', 'Software development position', ?),
        (UUID(), 'mgr', 'Manager', 'Team management position', ?),
        (UUID(), 'dir', 'Director', 'Department director position', ?)
      `,
      [groupMap["Position"], groupMap["Position"], groupMap["Position"]]
    );
    console.log("Inserted position options");

    await connection.execute(
      `
        INSERT INTO \`option\` (id, code_id, name, description, group_id) VALUES
        (UUID(), 'it', 'IT', 'Information Technology', ?),
        (UUID(), 'hr', 'HR', 'Human Resources', ?),
        (UUID(), 'fin', 'Finance', 'Financial Department', ?)
      `,
      [groupMap["Department"], groupMap["Department"], groupMap["Department"]]
    );
    console.log("Inserted department options");

    await connection.execute(`
        INSERT INTO \`employee\` 
          (first_name, last_name, email, date_hired, salary, department, position) 
        VALUES
          ('John', 'Doe', 'john.doe@example.com', '2020-05-15', 75000.00, 'it', 'dev'),
          ('Jane', 'Smith', 'jane.smith@example.com', '2019-03-10', 85000.00, 'hr', 'mgr'),
          ('Michael', 'Johnson', 'michael.johnson@example.com', '2018-11-22', 95000.00, 'fin', 'dir'),
          ('Sarah', 'Williams', 'sarah.williams@example.com', '2021-02-28', 80000.00, 'it', 'mgr')
      `);
    console.log("Inserted employees");

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    if (connection) await connection.end();
  }
}

seedDatabase();
