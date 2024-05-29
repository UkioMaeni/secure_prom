import { Sequelize } from 'sequelize';


const sequelize:Sequelize = new Sequelize('postgres://secure:secure@localhost:5432/secure');
     
    
export default sequelize;
