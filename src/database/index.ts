import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'langflix_development',
  username: 'langflix',
  password: '9102',
	define: {
    underscored: true
  }
})

export { Sequelize };

