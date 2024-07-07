import { Sequelize } from 'sequelize';


const sequelize:Sequelize = new Sequelize('postgres://secure:secure@localhost:5432/secure',{logging:false});
//const sequelize:Sequelize = new Sequelize('postgres://postgres:1234@localhost:5432/ohrana',{logging:false});
    
export default sequelize;

//
//23217
// 
