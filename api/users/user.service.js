const pool=require("../../config/database");


module.exports={
    create:(data,callback)=>{
        //console.log(data.last_name)
        pool.query(
            `insert into registration (LastName,FirstName,gender,email,password,number)
              values(?,?,?,?,?,?)`,
              [
                data.LastName,
                data.FirstName,
                data.gender,
                data.email,
                data.password,
                data.number
              ],
              (error,results,fields)=>{
                if(error){
                   return callback(error);
                }
                return callback(null,results);
                }
              
        );
    },

    getusers:(callback)=>{
      pool.query(
        ` select * from registration`,
        [],
        (error,results,fields)=>{
          if(error){
            return callback(error);
         }
         return callback(null,results);
        }
      )

    },

    getuserbyid:(id,callback)=>{
      pool.query(
        ` select * from registration where id=?`,
        [id],
        (error,results,fields)=>{
          if(error){
            return callback(error);
         }
         return callback(null,results[0]);
        }
      )

    },

    updateuser:(data,callback)=>{
      pool.query(
        `update registration SET LastName=?,FirstName=?,gender=?,email=?,password=?,number=? where id=?`,
        [
          data.LastName,
          data.FirstName,
          data.gender,
          data.email,
          data.password,
          data.number,
          data.id
        ],
        (error,results,fields)=>{
          if(error){
             return callback(error);
          }
          return callback(null,results);
          }

      )
    },

    deleteuser:(data,callback)=>{
      pool.query(
        `delete from registration where id =?`,
        [data.id],
        (error,results,fields)=>{
          if(error){
             return callback(error);
          }
          return callback(null,results[0]);
          }
      );
    },

    getuserbyEmail:(email,callback)=>{
      pool.query(
        `select * from registration where email=?`,
        [email],
        (error,results,fields)=>{
          if(error){
            return callback(error);
         }
         return callback(null,results[0]);
        }

      );
    }
}