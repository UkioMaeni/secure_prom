import { Sequelize } from 'sequelize';


const sequelize:Sequelize = new Sequelize('postgres://postgres:1234@localhost:5432/ohrana');
     
    
export default sequelize;
