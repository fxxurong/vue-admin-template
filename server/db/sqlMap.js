const sqlMap = {
  // 用户接口
  user: {
    deluserbyusername: 'delete from user where username = (?)',
    valid_name: 'select username from user where username = (?)',
    vaild_pwd: 'select password from user where username = (?)',
    userlist: 'select * from user',
    update_user: 'update admin_user set',
    addUser:
      'insert into user (username,name,password,email,roles) values (?,?,?,?,?)',
    validuser: 'select * from user where username = (?) and password = (?)',
    findpwdbyname: 'select password from user where username = (?)',
    finduserbyusername: 'select * from user where username = (?)',
    finduserbyname: 'select * from user where name = (?)',
    updatestatus: 'update user set status = (?) where username = (?)',
    samplelist: 'SELECT * FROM `admin_database`.`samples` LIMIT 100',
  },
};

module.exports = sqlMap;
