import path from 'path';
import { readFile } from 'fs-promise';
import debug from 'debug';

import marked from 'marked';

const simplifyUsers = (collection) => collection
  .map(({ user, seed }) => ({ ...user, seed }))
  .map(({ name, seed, picture }) => ({ name, seed, picture }));

export default function(router) {

  router.get('/syssetting', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { properties: { allowed_login_num: 3, login_mail_domain: 'aaa.com', week2day: 5, day2hour: 8 }, mailserver: { smtp: { host: '10.2.5.34', port: 25, tls: 1, username:'xxxxx', password: '******' }, send: { from: 'actionview@126.com', prefix: 'actionview' } }, sysroles: { sys_admin: [ { id: 'nhy67ujm', email:'wangwu@aaa.com', name: 'wangwu' }, { id: 'nhy67ujm2', email:'wangwu@aaa.com', name: 'wangwuaaaa' } ] } } };
    return res.status(200).send(results);
  });

  router.post('/syssetting', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);                                                                               
    const results = { ecode: 0, data: { properties: { allowed_login_num: 5, mail_domain: 'aaa.com' }, timetrack: { week2day: 6, day2hour: 7 }, mailserver: { smtp: { host: '10.2.5.34', port: 25, tls: 1, username:'xxxxx' }, send: { from: 'actionview@126.com', prefix: 'actionview' } }, sysroles: { sys_admin: [ { id: 'nhy67ujm', email:'wangwu@aaa.com', name: 'wangwu' }, { id: 'nhy67ujm2', email:'wangwu@aaa.com', name: 'wangwuaaaa' } ] } } };
    return res.status(200).send(results);
  });

  router.post('/mysetting/notify', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { mail_notify: true, mobile_notify: true } };
    return res.status(200).send(results);
  });

  router.get('/mysetting', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { accounts: { avatar: '', name: 'Wang Wu', email: 'wangwu@aaa.com', department: 'Ministry of Science and Technology', phone: 13111111111 }, notifications: { mail_notify: true, mobile_notify: true, daily_notify: false, monthly_notify: false }, favorites: { language: 'chinese' } } };
    return res.status(200).send(results);
  });

  router.get('/scheme', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ id: '546761', name: 'Software development class', description: 'aaaaaaaaaaa' },{ id: '546763', name: 'Market supply and demand', description: 'aaaaaaaaaaa', disabled: false },{ id: '546762', name: 'Brother brother', disabled: true }] };
    return res.status(200).send(results);
  });

  router.get('/user/:id/renewpwd', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: '' };
    return res.status(200).send(results);
  });

  router.post('/user/resetpwdsendmail', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { resetLinkToMail: 'ggg@aa.com' } };
    return res.status(200).send(results);
  });

  router.get('/user/resetpwd', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { account: 'aa@bb.com' } };
    return res.status(200).send(results);
  });

  router.post('/user/resetpwd', function(req, res) {
    const startTime = new Date().getTime(); 
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: {} };
    return res.status(200).send(results);
  });

  router.put('/user/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { directory: 'self', id: '11133111', first_name: 'Wang Wu111333', email: 'wangwu@aaa.com', phone: 13111111111, status: 'active' } };
    return res.status(200).send(results);
  });

  router.delete('/user/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: 'aaa' };
    return res.status(200).send(results);
  });

  router.post('/user', function(req, res) {
    const startTime = new Date().getTime(); 
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: '' };
    return res.status(200).send(results);
  });

  router.get('/user', function(req, res) {
    const startTime = new Date().getTime(); 
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ id: '1111', first_name: 'Wang Wu111', email: 'wangwu@aaa.com', phone: 13111111111, groups:['aa', 'bb'], status: 'inactive' }, { id: '111122', first_name: 'Wang Wu111',email: 'wangwu@aaa.com', phone: 13111111111, status: 'invalid', directory: 'self' },  { directory: '1111', id: '111111', first_name: 'Wang Wu11331',email: 'wangwu@aaa.com', phone: 13111111111, status: 'active' }, { directory: 'self', id: '11133111', first_name: 'Wang Wu111333', email: 'wangwu@aaa.com', phone: 13111111111, status: 'active' } ], options: { groups: [{ id:'111', name:'111' }, { id:'222', name:'222' }], directories: [{ id:'1111', name:'111' }, { id:'2222', name:'222' }] } };
    return res.status(200).send(results);
  });

  router.get('/user/search', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ id: '1111', name: 'Wang Wu111', email: 'wangwu@aaa.com', phone: 13111111111, status: 'active' }, { id: '111122', name: 'Wang Wu111',email: 'wangwu@aaa.com', phone: 13111111111, status: 'active' },  { id: '111111', name: 'Wang Wu11331',email: 'wangwu@aaa.com', phone: 13111111111, status: 'active' }, { id: '11133111', name: 'Wang Wu111333', email: 'wangwu@aaa.com', phone: 13111111111, status: 'closed' } ] };
    return res.status(200).send(results);
  });

  router.get('/user/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { id: '1111', first_name: 'Wang Wu111', email: 'wangwu@aaa.com' } };
    return res.status(200).send(results);
  });

  router.get('/group/search', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ id: '1111', name: '111' }, { id: '111122', name: 'Wang Wu111' },  { id: '111111', name: 'Wang Wu11331' }, { id: '11133111', name: 'Wang Wu111333' } ] };
    return res.status(200).send(results);
  });

  router.get('/group', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ id: '1111', name: 'Wang Wu111', users:['aa', 'bb'] }, { id: '111122', name: 'Wang Wu111',  users:[ { id: 'aa', name : 'aa' } , { id: 'bb', name: 'bb' }, { id: 'cc', name: 'cc' } ] },  { id: '111111', name: 'Wang Wu11331', description: '111111111111111111', status: 'invalid', users:['aa', 'bb', 'cc', 'dd'] }, { id: '11133111', name: 'Wang Wu111333' }], options: { total: 4, directories: [{ id:'1111', name:'111' }, { id:'2222', name:'222' }] } };
    return res.status(200).send(results);
  });

  router.get('/mygroup', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ id: '1111', name: 'Wang Wu111', users:['aa', 'bb'] }, { id: '111122', name: 'Wang Wu111',  users:[ { id: 'aa', name : 'aa' } , { id: 'bb', name: 'bb' }, { id: 'cc', name: 'cc' } ] },  { id: '111111', name: 'Wang Wu11331', description: '111111111111111111', status: 'invalid', users:['aa', 'bb', 'cc', 'dd'] }, { id: '11133111', name: 'Wang Wu111333' }], options: { total: 4 } };
    return res.status(200).send(results);
  });

  router.delete('/group/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { id: req.params.id } };
    return res.status(200).send(results);
  });

  router.get('/directory', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ id: '1111', name: '1111111', type: 'ldap', invalid_flag: 1 }, { id: '2222', name: '22222',type: 'OpenLDAP', invalid_flag: 0 }, { id: '3333', name: '3333',type: 'OpenLDAP', configs: { host: '10.1.5.33', port: 389, admin_username: 'admin', admin_password: '******', base_dn: 'dc=aa,dc=com', status: 'disable' } }] };
    return res.status(200).send(results);
  });

  router.get('/directory/:id/test', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { server_connect: true, user_count: 3, group_count: 2, group_membership: false } };
    return res.status(200).send(results);
  });

  router.get('/directory/:id/sync', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: {} };
    return res.status(200).send(results);
  });

  router.get('/logs', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ id: '1111', user: { id: '1111', name: '1111' }, method: 'GET', request_url: '/aa/bb', requested_start_at: 1533636586000, requested_end_at: 1533636586020, exec_time: 20, request_source_ip: '6.7.8.9', request_user_agent: 'xxxx', response_status: 200, project_key: 'demo', module: 'login', request_body: { aa: 'aa', bb: 'bb', cc: 'cc' } }, { id: '2222', user: { id: '1111', name: '1111' }, method: 'POST', request_url: '/aa/bb', requested_start_at: 1533636586000, requested_end_at: 1533636586020, exec_time: 20, request_source_ip: '6.7.8.9', request_user_agent: 'xxxx', response_status: 200, project_key: 'demo', module: 'login', request_body: { aa: 'aa', bb: 'bb', cc: 'cc' } }, { id: '3333', user: { id: '1111', name: '1111' }, method: 'PUT', request_url: '/aa/bb', requested_start_at: 1533636586000, requested_end_at: 1533636586050, exec_time: 50, request_source_ip: '10.1.5.6', request_user_agent: 'xxxx', response_status: 200, project_key: 'demo', module: 'login', request_body: { aa: 'aa', bb: 'bb', cc: 'cc' } } ], options: { 'total': 8, sizePerPage: 100 } };
    return res.status(200).send(results);
  });

  router.get('/myproject', function(req, res) {
    const startTime = new Date().getTime(); 
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ id: '1111', status: 'active', name: 'Demo item', description: 'aaaabbbbcccTest test test test test test test test test test test test test', key: 'demo', creator: 'Lu 13', create_time: 144444, principal: { id: 'nhy67ujm', nameAndEmail:'wangwu@aa.com', name: 'Wang Wu' } },{ id: '2222', name: 'Demonstration', key: 'demo2', creator: 'Wang Er Small', create_time: 144444, principal: { id: 'zzz', name: 'Wang Wu' } },{ id: '3333', name: 'Demo item', key: 'demo3', creator: 'Lu 13', create_time: 144444, principal: { id: 'zzz', name: 'Wang Wu' } },{ id: '4444', name: 'Demonstration', key: 'demo4', creator: 'Wang Er Small', create_time: 144444, principal: { id: 'zzz', name: 'Wang Er Small' } }] };
    return res.status(200).send(results);
  });

  router.get('/project/stats', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ key: 'demo', stats: { all: 20, unresolved: 15, assigntome: 10, trend: [{ day: '2019/05/02', new: 15 }, { day: '2019/05/03', new: 1 }, { day: '2019/05/04', new: 5 }, { day: '2019/05/05', new: 7 }, { day: '2019/05/06', new: 5 }, { day: '2019/05/07', new: 9 }, { day: '2019/05/08', new: 8 }] } }, { key: 'demo2', stats: { all: 20, unresolved: 15, assigntome: 10, trend: [{ day: '2019/05/02', new: 15 }, { day: '2019/05/03', new: 1 }, { day: '2019/05/04', new: 5 }, { day: '2019/05/05', new: 7 }, { day: '2019/05/06', new: 5 }, { day: '2019/05/07', new: 9 }, { day: '2019/05/08', new: 8 }] } }, { key: 'demo3', stats: { all: 20, unresolved: 15, assigntome: 10, trend: [{ day: '2019/05/02', new: 15 }, { day: '2019/05/03', new: 1 }, { day: '2019/05/04', new: 5 }, { day: '2019/05/05', new: 7 }, { day: '2019/05/06', new: 5 }, { day: '2019/05/07', new: 9 }, { day: '2019/05/08', new: 8 }] } }, { key: 'demo4', stats: { all: 20, unresolved: 15, assigntome: 10, trend: [{ day: '2019/05/02', new: 15 }, { day: '2019/05/03', new: 1 }, { day: '2019/05/04', new: 5 }, { day: '2019/05/05', new: 7 }, { day: '2019/05/06', new: 5 }, { day: '2019/05/07', new: 9 }, { day: '2019/05/08', new: 8 }] } }] };
    return res.status(200).send(results);
  });

  router.get('/project/recent', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ id: '546761', name: 'Demo item', key: 'demo', creator: 'Lu 13', create_time: 144444 },{ id: '54676i2', name: 'Demonstration', key: 'demo2', creator: 'Wang Er Small', create_time: 144444 },{ id: '5s46761', name: 'Demo item', key: 'demo', creator: 'Lu 13', create_time: 144444 },{ id: '54r676i2', name: 'Demonstration', key: 'demo2', creator: 'Wang Er Small', create_time: 144444 },{ id: '5i46761', name: 'Demo item', key: 'demo', creator: 'Lu 13', create_time: 144444 },{ id: '54aa676i2', name: 'Demonstration', key: 'demo2', creator: 'Wang Er Small', create_time: 144444 },{ id: '54bgg6761', name: 'Demo item', key: 'demo', creator: 'Lu 13', create_time: 144444 }], options: { 'total': 8 } };
    return res.status(200).send(results);
  });

  router.get('/project', function(req, res) {
    const startTime = new Date().getTime(); 
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ id: '546761', name: 'Demo item', key: 'demo', creator: 'Lu 13', create_time: 144444 },{ id: '54676i2', name: 'Demonstration', key: 'demo2', creator: 'Wang Er Small', create_time: 144444 },{ id: '5s46761', name: 'Demo item', key: 'demo', creator: 'Lu 13', create_time: 144444 },{ id: '54r676i2', name: 'Demonstration', key: 'demo2', creator: 'Wang Er Small', create_time: 144444 },{ id: '5i46761', name: 'Demo item', key: 'demo', creator: 'Lu 13', create_time: 144444 },{ id: '54aa676i2', name: 'Demonstration', key: 'demo2', creator: 'Wang Er Small', create_time: 144444 },{ id: '54bgg6761', name: 'Demo item', key: 'demo', creator: 'Lu 13', create_time: 144444 }], options: { 'total': 8 } };

    return res.status(200).send(results);
  });

  router.get('/project/options', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode:0, data: { principals: [{ id: '111', name: '1111', email: 'aa@aa.aa' }, { id: '222', name: '2222', email: 'aa@aa.aa' }, { id: '333', name: '3333', email: 'aa@aa.aa' }, { id: '444', name: '4444', email: 'aa@aa.aa' } ] } };
    return res.status(200).send(results);
  });

  router.get('/project/checkkey/:key', function(req, res) {
    const startTime = new Date().getTime(); 
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { flag : 1 } };
    return res.status(200).send(results);
  });

  router.get('/project/search', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ id: '1111', key: 'demo1', name: 'Demonstration example' }, { id: '2', key: 'demo2', name: 'Demo example' } ] };
    return res.status(200).send(results);
  });

  router.get('/project/:key', function(req, res) {
    const results = { ecode: 0, data: { id: '546761', name: 'Demonstration', key: 'demo', status: 'active', principal: { id:'xxx', name: 'Wang Wu' }, creator: 'Wang Wu', create_time: 144444 }, options: { permissions: [ 'manage_project', 'edit_comments', 'delete_comments', 'edit_worklog', 'delete_worklog', 'reset_issue', 'create_issue', 'edit_issue', 'delete_issue', 'exec_workflow', 'link_issue', 'view_project', 'download_file', 'remove_file', 'upload_file', 'assign_issue' ] } };
    return res.status(200).send(results);
  });

  router.get('/project/:key/summary', function(req, res) {
    const startTime = new Date().getTime(); 
    while (new Date().getTime() < startTime + 2000);
    const results = { 'ecode':0,'data':{ 'filters':[{ name: 'All of the problems', count: 120, query: {} }, { name: 'Allocated to me', count: 12, query: { assignee: 'me' } }, { name: 'have not decide', count: 12, query: { resolution: 'Unresolved' } }, { name: 'I am concerned', count: 4, query: { watcher: 'me' } }],'trend':[{ day: '2019/05/02', new: 15, resolved: 10, closed: 4 }, { day: '2019/05/03', new: 1, resolved: 6, closed: 14 }, { day: '2019/05/04', new: 5, resolved: 10, closed: 2 }, { day: '2019/05/05', new: 7, resolved: 10, closed: 6, notWorking: 1 }, { day: '2019/05/06', new: 5, resolved: 8, closed: 4 }, { day: '2019/05/07', new: 9, resolved: 9, closed: 9 }, { day: '2019/05/08', new: 8, resolved: 5, closed: 4 }],'new_issues':{ percent:30,'total':182,'580314351d41c82c7204e82c':16,'5803140b1d41c8689559abe4':81,'5803141b1d41c863de053625':75,'58898c1e1d41c844577ee642':9,'588be9be1d41c84f294a86e2':1 },'closed_issues':{ percent: 0,'total':6,'5803141b1d41c863de053625':5,'5803140b1d41c8689559abe4':1 },'assignee_unresolved_issues':{ '57afced21d41c8174d7421c1':{ 'percent': 80,'5803140b1d41c8689559abe4':33,'total':44,'5803141b1d41c863de053625':8,'58898c1e1d41c844577ee642':3 },'57afcef01d41c817500aed73':{ 'percent': 10,'5803141b1d41c863de053625':1,'total':1 },'58f1d7751d41c86e296e75ea':{ 'percent': 90,'5803141b1d41c863de053625':1,'total':1 },'57b12aee1d41c817500aed75':{ 'percent': 5,'5803140b1d41c8689559abe4':1,'total':1 },'57b12a801d41c819135a6c93':{ 'percent': 10,'58898c1e1d41c844577ee642':1,'total':1 } },'priority_unresolved_issues':{ '57a97fdd1d41c848b53bc166':{ '5803140b1d41c8689559abe4':19,'total':26,'5803141b1d41c863de053625':7, percent: 35 },'Major':{ '5803140b1d41c8689559abe4':14,'total':21,'58898c1e1d41c844577ee642':4,'5803141b1d41c863de053625':3, percent: 50 },'Blocker':{ '5803140b1d41c8689559abe4':1,'total':1, percent: 19 },'Critical':{ '5803140b1d41c8689559abe4':1,'total':1, percent: 5 } } },'options':{ 'types':[{ 'abb':'T','created_at':'2016-10-16 13:45:47','default':true,'disabled':false,'name':'\u4efb\u52a1','project_key':'boba','screen_id':'58ddfc5f1d41c82c6b16f42f','sn':1,'updated_at':'2017-03-31 21:47:21','workflow_id':'58dc8d9f1d41c828264c7bd3','id':'5803140b1d41c8689559abe4' },{ 'abb':'F','created_at':'2016-10-16 13:46:29','description':'','disabled':false,'name':'\u65b0\u529f\u80fd','project_key':'boba','screen_id':'58ddfc5f1d41c82c6b16f42f','sn':2,'type':'standard','updated_at':'2017-03-31 21:47:11','workflow_id':'58dc8d9f1d41c828264c7bd3','id':'580314351d41c82c7204e82c' },{ 'abb':'B','created_at':'2016-10-16 13:46:03','disabled':false,'name':'\u7f3a\u9677','project_key':'boba','screen_id':'58ddfc5f1d41c82c6b16f42f','sn':3,'updated_at':'2017-03-31 21:46:06','workflow_id':'58dc8d9f1d41c828264c7bd3','id':'5803141b1d41c863de053625' },{ 'abb':'I','created_at':'2017-03-31 21:46:51','name':'\u6539\u8fdb','project_key':'boba','screen_id':'58ddfc5f1d41c82c6b16f42f','sn':4,'updated_at':'2017-03-31 21:47:11','workflow_id':'58dc8d9f1d41c828264c7bd3','id':'58de5dcb1d41c82c6b16f43b' },{ 'abb':'S','created_at':'2017-01-26 13:41:50','description':'','disabled':true,'name':'\u5b50\u4efb\u52a1','project_key':'boba','screen_id':'58ddfc5f1d41c82c6b16f42f','sn':5,'type':'subtask','updated_at':'2017-05-20 21:16:14','workflow_id':'58dc8d9f1d41c828264c7bd3','id':'58898c1e1d41c844577ee642' }],'users':{ '57afced21d41c8174d7421c1':'Wang Wu','57afcef01d41c817500aed73':'Teacher Li','58f1d7751d41c86e296e75ea':'Li Lao 8','57b12aee1d41c817500aed75':'Yang Lao','57b12a801d41c819135a6c93':'Lu 13' },'priorities':{ 'Blocker':'\u81f4\u547d','Critical':'\u4e25\u91cd','Major':'\u91cd\u8981','Minor':'\u8f7b\u5fae','Trivial':'\u5fae\u5c0f' },'twoWeeksAgo':'2015\/06\/22' } }; 
    return res.status(200).send(results);
  });

  router.post('/project', function(req, res) {
    const startTime = new Date().getTime(); 
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { id: '546761', name: 'Demonstration', key: 'demo', principal: { id: 'zzz', name: 'Wang Er Small' }, creator: 'Wang Wu', create_time: 144444 } };
    return res.status(200).send(results);
  });

  router.put('/project/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { id: '546761', name: 'Demonstration', key: 'demo', principal: { id: 'zzz', name: 'Wang Er Small' }, creator: 'Wang Wu', create_time: 144444 } };
    return res.status(200).send(results);
  });

  router.get('/project/:key/config', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { types: [{ id: '546761', abb:'T', name: 'Task', description:'bbbbb', screen_id:'111', workflow_id:'111', 'screen': { name: 'aaa', schema: [{ 'key':'title','name':'\u4e3b\u9898','type':'Text','required':true,'id':'580039521d41c81fdf499353' }] } },{ id: '546763', name: 'need', abb:'D', screen_id:'222', workflow_id:'111', default: true },{ id: '546762', abb: 'C', name: 'defect', screen_id:'111', workflow_id:'111' },{ id: '2323', abb:'S', name: 'Subtasks', screen_id:'111', workflow_id:'222' }] } };
    return res.status(200).send(results);
  });

  router.get('/project/:key/type', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ id: '546761', abb:'T', name: 'Task', description:'bbbbb', screen_id:'111', workflow_id:'111' },{ id: '546763', name: 'need', abb:'D', screen_id:'222', workflow_id:'111', default: true },{ id: '546762', abb: 'C', name: 'defect', screen_id:'111', workflow_id:'111' },{ id: '2323', abb:'S', name: 'Subtasks', screen_id:'111', workflow_id:'222' }], options:{ screens:[{ id:'111',name:'interface1' },{ id:'222', name:'interface2' }, { id:'333', name:'interface3' }], workflows:[{ id:'111',name:'process1' },{ id:'222', name:'process2' }, { id:'333', name:'process3' }] } };
    return res.status(200).send(results);
  });

  router.get('/project/:key/module', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ id: '546761', name: 'Task', description:'bbbbb', principal: { name: 'lihui', id: '111' }, defaultAssignee_id:'111' },{ id: '546763', name: 'need', principal_id:'222', defaultAssignee_id:'111', default: true },{ id: '546762', name: 'defect', principal_id:'111', defaultAssignee_id:'111' },{ id: '2323', name: 'Subtasks' }], options:{ users: [{ id: '111', name:'Wang Wu', email:'wangwu@aaa.com' }, { id: '222', name:'Teacher Li', email: 'lilaoshi@aaa.com' }] } };
    return res.status(200).send(results);
  });

  router.get('/project/:key/version', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ id: '546761', name: 'Task', description:'bbbbb', start_time:1474642399, end_time:1474646399 },{ id: '546763', name: 'need', start_time:1474546399, end_time:1474646499 },{ id: '546762', name: 'defect', start_time:1474646399, end_time:1474646399 },{ id: '2323', name: 'Subtasks' }] };
    return res.status(200).send(results);
  });

  router.get('/project/:key/issue', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, options: { 'total': 9, today: '2018/08/13' }, data: [{ no:1555, id: '546761', type:'1111', labels:['Video transfer code', 'administrator'],title: 'The responsible person in the mission is not required*No', description:'bbbbb', priority:'1111', state:'546761', epic: '1111', resolve_version: '1111', reporter: { id:'aaa', name:'Wang Wu' }, created_at: '1533636586', expect_complete_time: 1534646586, expect_start_time: 1533636586, progress: 80, watching: true },{ no:9999, id: '546763', type:'1111', labels:['Video transfer code', 'administrator'], title: 'demoThis month, the monthly report that is not filled out is displayed for this month.', assignee:{ id:'aaa', name:'Wang Wu' }, priority:'2222', state:'546761', epic: '2222', created_at: '1533636586', expect_complete_time: 1534446586, expect_start_time: 1533636586, progress: 50, rank: 98 },{ no:3, id: '546762', type:'2222', assignee: { id:'xxxx', name:'wangwu' }, title: 'demoNew window in the top right of the top page, the window is closed, the window is closed without prompt information', priority:'3333', state:'546762', epic: '1111', reporter: { id:'aaa', name:'Wang Wu' }, created_at: '1533636586', rank: 49 },{ no:4, id: '2323', title: 'demofront page-My schedule start time, the first line and the second line font size are the same' , created_at: '1533636586', expect_complete_time: 1538963157, rank: 88 },{ no:1, id: '5426761', type:'1111', title: 'dsaffsafsafsdf', description:'bbbbb', priority:'1111', state:'546763', epic: '2222', reporter: { id:'aaa', name:'Wang Wu' }, created_at: '1533636586', rank: 21 },{ no:2, id: '5462763', type:'1111', labels:['Video transfer code', 'administrator'], title: 'xxxxxxxxxxxx', progress: 80, assignee:{ id:'aaa', name:'Wang Wu' }, priority:'2222', state:'546762', epic: '2222', created_at: '1533636586', rank: 35 },{ no:365, id: '5367621', type:'2222', assignee: { id:'xxxx', name:'wangwu' }, title: 'YYYYYYYYYYYYYYY', priority:'3333', state:'546761', reporter: { id:'aaa', name:'Wang Wu' }, created_at: '1533636586', rank: 23 },{ no:8, type: '1111', id: '22323', title: 'ZZZZZZZZZZZZZZ' , created_at: '1533636586', expect_complete_time: 1534446586, expect_start_time: 1533636586, priority:'1111', state: '546762', parent: { no: 2, title: 'xxxxxxxxxxxx', id: '5462763', state: '546762' }, rank : 100 }, { no:7, type: '1111', id: '2232dd3', title: 'demofront page-ssssssss' , created_at: '1533636586', priority:'1111', state: '546762', parent: { no: 2, title: 'xxxxxxxxxxxx', id: '5462763', state: '546762' }, rank : 100 }] };
    return res.status(200).send(results);
  });

  router.get('/project/:key/issue/search', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data:[{ id:'1111', title:'aaaa', no:111, type:'2222' }, { id:'2222', title:'bbbb', no:222, type:'2222' }, { id:'3333', title:'cccc', no:333, type:'2222' }] };
    return res.status(200).send(results);
  }); 

  router.get('/project/:key/issue/:id/wfactions', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 200);
    const results = { ecode: 0, data: [{ id: 1001, name: 'aa', state: '546761' }, { id: 1002, name: 'bb', state: '546762' } ] };
    return res.status(200).send(results);
  });

  router.get('/project/:key/issue/:id/worklog', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ id: '1111', started_at: 1478414469, adjust_type: '1', spend: '3d 4h', comments: '1111111', recorder: { id:'aaa', name:'Wang Wu' }, recorded_at: 1478414469 }, { id: '2222', started_at: 1478414469, adjust_type: '2', spend: '6h', comments: '2222222', recorder: { id:'aaa', name:'Wang Wu' }, recorded_at: 1478414469 }, { id: '3333', started_at: 1478414469, adjust_type: 1, spend: '3d 4h 5m', comments: '333333',recorder: { id:'aaa', name:'Wang Wu' }, recorded_at: 1478414469 }], options: { current_time: 1520943279 } };
    return res.status(200).send(results);
  });

  router.post('/project/:key/issue/:id/worklog', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { id: '4444', started_at: 1478414469, adjust_type: 1, spend: '3h', comments: '1111111' } };
    return res.status(200).send(results);
  });

  router.put('/project/:key/issue/:id/worklog/:worklog_id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { id: '3333', started_at: 1478414469, adjust_type: 1, spend: '3h', comments: '1111111' } };
    return res.status(200).send(results);
  });

  router.put('/project/:key/issue/:id/worklog/:worklog_id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { id: '3333' } };
    return res.status(200).send(results);
  });

  router.get('/project/:key/issue/:id/history', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ operator: { id: '1111', name: 'Wang Wu', email: 'bbb' }, operated_at: 1478414469, operation: 'modify',items: [ { field: 'priority', before: 'aa', after: 'bb' }, { field: 'priority', before: 'aa', after: 'bb' }, { field: 'priority', before: 'aa', after: 'bb' } ] }, { operator: { id: '1111', name: 'Wang Wu', email: 'tttt' }, operated_at: 1478415479, operation: 'modify',items: [ { field: 'priority', before: 'aa', after: 'bb' }, { field: 'priority22', before: 'aa', after: 'bb' }, { field: 'priority3', before: 'aa', after: 'bb' } ] }, { operator: { id: '1111', name: 'Wang Wu' }, operated_at: 1478415469, operation: 'new' }], options:{ current_time: 1520943279 } };
    return res.status(200).send(results);
  });

  router.get('/project/:key/issue/:id/comments', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ id: '1111', contents: 'aaaaaa', creator: { id:'aaa', name:'Wang Wu' }, created_at: 1478415469, edited_flag : 1 }, { id: '2222', contents: '@Wang Wu bbbb\r\nbbbb', atWho: [ { id: '111', name: 'Wang Wu', email: 'wangwu@aaa.com' } ], creator: { id:'aaa', name:'Wang Wu' }, created_at: 1478415469, reply: [ { id: '111', to: { id: '111', name: 'Wang Wu', email: 'wangwu@aaa.com' }, contents: 'Test test test test test test test test test test test test test test test test test test test test test test test test test test test>Test test test', created_at: 1478415469, updated_at: 1478415469, creator: { id: '111', name: 'Wang Wu', email: 'wangwu@aaa.com' } }, { id: '2222', contents: 'Test test test test test test test test test test test test test test test test test test test test test test test test test test test>Test test test', created_at: 1478415469, updated_at: 1478415469, creator: { id: '111', name: 'Wang Wu', email: 'wangwu@aaa.com' } } ] }, { id: '3333', contents: 'aaaaaa', creator: { id:'aaa', name:'Wang Wu' }, created_at: 1478415469 }], options: { current_time: 1520943279 } }; 
    return res.status(200).send(results);
  });

  router.post('/project/:key/issue/:id/comments', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { id: '5555', contents: 'ttttttt', creator: { id:'aaa', name:'Wang Wu' }, created_at: 1478415469 } };
    return res.status(200).send(results);
  });

  router.delete('/project/:key/issue/:id/comments/:cid', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { id: '1111' } };
    return res.status(200).send(results);
  });

  router.get('/project/:key/issue/options', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode:0, data: { timetrack:{ w2d: 6, d2h: 9 },filters:[{ id:'1111', name:'Allocated to me', query:{ aa: 'aa' } },{ id:'2222', name:'Allocated to me2', query:{ bb:'bb' } },{ id:'3333', name:'Allocated to me3', query:{ cc:'cc' } },{ id:'4444', name:'Allocated to me4', link:'dd' },{ id:'5555', name:'Allocated to me5', link:'dd' }], types: [{ id: '1111', name: 'Task',abb:'T', type: 'standard' }, { id: '2222', name: 'Bug', abb:'B', type:'standard', default: true, schema: [ { key:'name', name:'name', required: true, type: 'Text' }, { key:'title', name:'theme', type: 'Url', defaultValue: 'bb' }, { key:'version', name:'Version', type: 'MultiSelect', optionValues: [{ id: '1111', name: 'aaaa' },{ id: '2222', name: 'bbbb' }, { id: '3333', name: 'cccc' } ], defaultValue: '1111', required: true }, { key:'description', name:'describe', type: 'TextArea' }, { key: 'labels', name: 'Label', type: 'Labels', optionValues: [{ id: 'Transcode failure', name: 'Transcode failure' },{ id: 'Transcoding success', name: 'Transcoding success' }, { id: 'administrator', name: 'administrator' }] }, { key: 'epic', name: 'Epic',  type:'Select', optionValues:[{ id: '1111', name: '1111' }, { id: '2222', name: '2222' }] },{ key:'attachments', name:'appendix', type: 'File' }, { key:'expect_time', name:'Complete time', type: 'DateTimePicker' }, { key:'assignee', name:'Manager', type: 'Select' } ] }, { id: '3333', name: 'need',abb:'D', type:'standard', schema: [ { key:'title', name:'theme', type: 'Text', required: true }, { key:'version', name:'Version', type: 'MultiSelect', optionValues: [{ id: '1111', name: 'aaaa' },{ id: '2222', name: 'bbbb' }, { id: '3333', name: 'cccc' } ], defaultValue: '1111', required: true }, { key:'city2', name:'Complete time', type: 'CheckboxGroup', optionValues: [{ id: '1111', name: 'aaaa' },{ id: '2222', name: 'bbbb' }, { id: '3333', name: 'cccc' } ], defaultValue: '1111', required: true }, { key:'expect_time', name:'Expectant time', type: 'DateTimePicker', required: true }, { key:'title2', name:'theme', type: 'Number' } ] }, { id: '4444', name: 'Subtasks', abb:'S', type:'subtask', schema: [ { key:'name', name:'name', required: true, type: 'TextArea' }, { key:'title', name:'theme', type: 'Url', defaultValue: 'bb' }, { key:'version', name:'Version', type: 'MultiSelect', optionValues: [{ id: '1111', name: 'aaaa' },{ id: '2222', name: 'bbbb' }, { id: '3333', name: 'cccc' } ], defaultValue: '1111', required: true }, { key:'attachments', name:'appendix', type: 'File' }, { key:'expect_time', name:'Complete time', type: 'DateTimePicker' }, { key:'assignee', name:'Manager', type: 'Select' } ] }, { id: '5555', name: 'Subtasks2', abb:'S', type:'subtask', schema: [ { key:'title', name:'theme', type: 'Url', defaultValue: 'bb' }, { key:'version', name:'Version', type: 'MultiSelect', optionValues: [{ id: '1111', name: 'aaaa' },{ id: '2222', name: 'bbbb' }, { id: '3333', name: 'cccc' } ], defaultValue: '1111', required: true }, { key:'attachments', name:'appendix', type: 'File' }, { key:'expect_time', name:'Complete time', type: 'DateTimePicker' }, { key:'assignee', name:'Manager', type: 'Select' } ] }], priorities:[{ id:'1111',color:'#000000',name:'important' },{ id:'2222',color:'#aaaaaa',name:'generally' },{ id:'3333',color:'#cccccc',name:'small' }], resolutions:[{ id:'1111',name:'Pending' },{ id:'2222',name:'In development' },{ id:'3333',name:'Finish' }], states:[{ id:'546761',name:'Pending',category: 'new' },{ id:'546762',name:'In development', category:'inprogress' },{ id:'546763',name:'Finish',category:'completed' }], assignees: [{ id: '111', name:'Wang Wu', email: 'wangwu@aaa.com' }, { id: '222', name:'Teacher Li', email: 'lilaoshi@aaa.com' }], users: [{ id: '111', name:'Wang Wu', email: 'wangwu@aaa.com' }, { id: '222', name:'Teacher Li', email: 'lilaoshi@aaa.com' }], versions:[{ id: '1111', name: '1111' }, { id: '2222', name: '2222' }], epics: [{ id: '1111', bgColor: '#4a6785', name: '1111' }, { id: '2222', bgColor: '#8eb021', name: '2222' }], sprints: [{ no: 4, name: 'sprint 4' }, { no: 3, name: 'sprint 3' }, { no: 2, name: 'sprint 2' }, { no: 1, name: 'sprint 1' }], fields: [ { key: 'title', name: 'theme', type: 'Text' }, { key: 'type', name: 'type', type: 'Select' }, { key: 'priority', name: 'priority', type:'Select' }, { key: 'state', name: 'state', type:'Select' }, { key: 'assignee', name: 'Manager', type: 'SingleUser' }, { key: 'aa', type: 'Text', name: 'AA' }, { key: 'bb', type: 'Text', name: 'BB' }, { key: 'cc', type: 'MultiSelect', name: 'CC', optionValues: [{ id: '1111', name: 'aaaa' },{ id: '2222', name: 'bbbb' }, { id: '3333', name: 'cccc' }] }, { key:'dd', type:'DateTimePicker', name: 'DD' }, { key:'ee', type:'Number', name: 'EE' }, { key:'ff', type:'MultiUser', name: 'FF' }, { key:'gg', type:'TextArea', name: 'GG', maxLength: 20 } ], labels:[ { name: 'Transcode failure', bgColor: '#ccc' }, { name: 'Transcoding success', bgColor: '#34f444' }, { name: 'administrator', bgColor: '#ddd' } ], relations: [ { id: 'blocks', out: 'blocks', in: 'is blocked by' }, { id: 'clones', out: 'clones', in: 'is cloned by' }, { id: 'duplicates', out: 'duplicates', in: 'is duplicated by' }, { id: 'relates', out: 'relates to', in: 'relates to' } ], display_columns: [ { key: 'resolution', width: '100' }, { key: 'priority', width: '200' }, { key: 'assignee', width: '100' }, { key: 'state', width: '150' }, { key: 'resolve_version', width: '150' } ] } };
    return res.status(200).send(results);
  });

  router.get('/project/:key/issue/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { id: '546761', no:155, name: 'aaaaaaa', labels:['Transcode failure', 'administrator'], epic: '2222', sprints: [2, 4], expect_complete_time: 1534446586, expect_start_time: 1533636586, progress: 60, links: [{ id: '1111', src:{ id:'546761', no:111, type:'2222', title:'aaaaaaa' }, dest:{ id:'546762', no:112, type:'2222', title:'aaaaaaa' }, relation:'is blocked by' }, { id: '1111',dest:{ id:'546761', no:111, type:'2222', title:'aaaaaaa' }, src:{ id:'546762', no:113, type:'2222', title:'bbbbb' }, relation:'is blocked by' }, { id: '1111',src:{ id:'546761', no:111, type:'2222', title:'aaaaaaa' }, dest:{ id:'546762', no:114, type:'2222', title:'cccc' }, relation:'is cloned by' }], description: 'bbbbbb![file](http://www.actionview.cn:8080/api/project/demo/file/5be377d810e4114e937c5524)![file](http://www.actionview.cn:8080/api/project/demo/file/5be377d810e4114e937c5524)![file](http://www.actionview.cn:8080/api/project/demo/file/5be377d810e4114e937c5524)cccc<script/>c', assignee:{ id: '1111', name: 'Wang Wu' },type: '2222', title: 'National dialed type project adds the responsible person in the task*No', priority:'1111', state:'546762', expect_time: 1478415469, version: '1111,2222', wfactions: [ { name:'Incorporate iteration', screen: '11111', id: 1111 }, { name:'Incorporate iteration', screen: '11111', id: 1112 }, { name:'Incorporate iteration', screen: '11111', id:1113 } ], attachments:[{ id: '1111',type:'image/jpeg', uploader:'aaaa', size: 2222, time:1474646499, name: 'screenshot.jpeg' }, { id: '2222',type:'docx', uploader:'aaaa', size: 2222, time:1474646499, name: 'test.docx' },{ id: '2222',type:'docx',uploader:'aaaa', size: 2222, time:1474646499, name: 'test2.docx' }, { id: '4444',type:'image/png',uploader:'aaaa', size: 2222, time:1474646499, name: 'screenshot3.jpeg' }], watchers: [{ name:'aa', email:'aa@aa.com' }, { name:'aa', email:'aa@aa.com' }, { name:'aa', email:'aa@aa.com' }, { name:'aa', email:'aa@aa.com' }, { name:'aa', email:'aa@aa.com' }, { name:'aa', email:'aa@aa.com' }, { name:'aa', email:'aa@aa.com' }, { name:'aa', email:'aa@aa.com' }, { name:'aa', email:'aa@aa.com' }, { name:'aa', email:'aa@aa.com' }, { name:'aa', email:'aa@aa.com' }] } };
    return res.status(200).send(results);
  });

  router.post('/project/:key/issue', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { no:1, id: '546761', type:'1111', title: 'National dialed type project adds the responsible person in the task*No', description:'bbbbb', priority:'1111', state:'2222', creator: { id:'aaa', name:'Wang Wu' } } };
    return res.status(200).send(results);
  }); 

  router.post('/project/:key/issue/searcher', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { id: '6666', name:'Allocated to me6', link:'ee' } };
    return res.status(200).send(results);
  });

  router.delete('/project/:key/issue/searcher/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { id: req.params.id } };
    return res.status(200).send(results);
  });

  router.post('/project/:key/issue/:id/labels', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { id: '546761', no:155, name: 'aaaaaaa', labels:['Transcode failure', 'Transcoding success', 'administrator'], links: [{ id: '1111', src:{ id:'546761', no:111, type:'2222', title:'aaaaaaa' }, dest:{ id:'546762', no:112, type:'2222', title:'aaaaaaa' }, relation:'is blocked by' }, { id: '1111',dest:{ id:'546761', no:111, type:'2222', title:'aaaaaaa' }, src:{ id:'546762', no:113, type:'2222', title:'bbbbb' }, relation:'is blocked by' }, { id: '1111',src:{ id:'546761', no:111, type:'2222', title:'aaaaaaa' }, dest:{ id:'546762', no:114, type:'2222', title:'cccc' }, relation:'is cloned by' }], description: 'bbbbbb', assignee:{ id: '1111', name: 'Wang Wu' },type: '2222', title: 'National dialed type project adds the responsible person in the task*No', priority:'1111', state:'546762', expect_time: 1478415469, version: '1111,2222', wfactions: [ { name:'Incorporate iteration', screen: '11111', id: 1111 }, { name:'Incorporate iteration', screen: '11111', id: 1112 }, { name:'Incorporate iteration', screen: '11111', id:1113 } ], attachments:[{ id: '1111',type:'image/jpeg', uploader:'aaaa', size: 2222, time:1474646499, name: 'screenshot.jpeg' }, { id: '2222',type:'docx', uploader:'aaaa', size: 2222, time:1474646499, name: 'test.docx' },{ id: '2222',type:'docx',uploader:'aaaa', size: 2222, time:1474646499, name: 'test2.docx' }, { id: '4444',type:'image/png',uploader:'aaaa', size: 2222, time:1474646499, name: 'screenshot3.jpeg' }], watchers: [{ name:'aa', email:'aa@aa.com' }, { name:'aa', email:'aa@aa.com' }, { name:'aa', email:'aa@aa.com' }, { name:'aa', email:'aa@aa.com' }, { name:'aa', email:'aa@aa.com' }, { name:'aa', email:'aa@aa.com' }, { name:'aa', email:'aa@aa.com' }, { name:'aa', email:'aa@aa.com' }, { name:'aa', email:'aa@aa.com' }, { name:'aa', email:'aa@aa.com' }, { name:'aa', email:'aa@aa.com' }] } };
    return res.status(200).send(results);
  });

  router.post('/project/:key/type', function(req, res) {
    const results = { ecode: 0, data: { id: 'were', name: '5Cquestion', screen: { id:'222', name:'interface2' }, workflow:{ id:'111', name:'process1' } } };
    return res.status(200).send(results);
  });

  router.get('/project/:key/type/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const { id } = req.params;
    let results = {};
    if (id === '546761') {
      results = { ecode: 0, data: { id: '546761', name: 'Task', screen: '111', workflow:'111' } };
    } else {
      results = { ecode: 0, data: { id: '546762', name: 'Task2', screen: '222', workflow:'111' } };
    }
    return res.status(200).send(results);
  });

  router.put('/project/:key/type/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { id: '546761', name: 'Task1111', screen:{ id:'222', name:'interface2' }, workflow:{ id:'222', name:'process2' } } };
    return res.status(200).send(results);
  });

  router.put('/project/:key/type', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ id: '546763', name: 'need', screen: { id:'222', name:'interface2' }, workflow:{ id:'111', name:'process2' } },{ id: '546761', name: 'Task', screen: { id:'111', name:'interface1' }, workflow:{ id:'111', name:'process1' } },{ id: '546762', name: 'defect', screen: { id:'111', name:'interface1' }, workflow:{ id:'111', name:'process1' } },{ id: '2323', name: 'Subtasks', screen: { id:'111', name:'interface1' }, workflow:{ id:'222', name:'process2' } }] };
    return res.status(200).send(results);
  });

  router.delete('/project/:key/type/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { id: req.params.id } };
    return res.status(200).send(results);
  });

  /************** field *****************/
  router.get('/project/:key/field', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [
      { id: '546761', name: 'theme', type: 'Text', project_key: '$_sys_$', screens: [{ id:'111', name:'interface1' }], key:'title' },
      { id: '546763', name: 'describe', type:'Text', project_key: '$_sys_$', screens: [{ id:'222', name:'interface2' }, { id:'111', name:'interface1' }], key:'description' },
      { id: '546762', name: 'priority', type:'Select', screens: [], key:'priority' },
      { id: '546764', name: 'Starting time', type:'DatePicker', screens: [{ id:'111', name:'interface1' }], key:'starttime' },
      { id: '2323', name: 'appendix', type:'CheckboxGroup', screens: [{ id:'111', name:'interface1' }], key:'attachment' }],
      options: { types: [{ id: '1111', name: '1111' }, { id: '2222', name: '2222' }] }
    };
    return res.status(200).send(results);
  });

  router.post('/project/:key/field', function(req, res) {
    const results = { ecode: 0, data: { id: 'were', name: '5Cquestion', type:'Select', key:'test', description:'aaaaaaa' } };
    return res.status(200).send(results);
  });

  router.get('/project/:key/field/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const { id } = req.params;
    let results = {};
    if (id === '546761') {
      results = { ecode: 0, data: { id: '546761', name: 'theme', key:'title',type:'Text', description:'aaaaaaaa', defaultValue: '123qwe' } };
    } else if (id === '546763') {
      results = { ecode: 0, data: { id: '546763', name: 'describe', key:'title',type:'TextArea', description:'aaaaaaaa', defaultValue: 'sfasfsaf' } };
    } else if (id === '546764') {
      results = { ecode: 0, data: { id: '546763', name: 'describe', key:'title',type:'DatePicker', description:'aaaaaaaa', defaultValue: 'sfasfsaf' } };
    } else if (id === '2323') {
      results = { ecode: 0, data: { id: '546763', name: 'describe', key:'title',type:'CheckboxGroup', optionValues:['111', '222', '333'], defaultValue: ['111', '222'] } };
    } else {
      results = { ecode: 0, data: { id: '546762', name: 'priority', key:'priority', type:'Select', optionValues:['111', '222', '333'], defaultValue: '222' } };
    }
    return res.status(200).send(results);
  });

  router.put('/project/:key/field/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { id: '546761', name: 'theme2', key:'title',type:'Text', description:'bbbbb' } };
    return res.status(200).send(results);
  });

  router.delete('/project/:key/field/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { id: req.params.id } };
    return res.status(200).send(results);
  });

  router.get('/project/:key/field/:id/used', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ key: 'demo', name: 'demo1', status: 'active', screens: [{ id: '1111', name: '1111' }, { id: '2222', name: '2222' }] }, { key: 'demo2', name: 'demo2', status: 'active', screens: [{ id: '3333', name: '3333' }, { id: '4444', name: '4444' }] }, { key: 'demo3', name: 'demo3', screens: [{ id: '1111', name: '1111' }, { id: '2222', name: '2222' }] }] };
    return res.status(200).send(results);
  });

  /************** screen *****************/
  router.get('/project/:key/screen', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [
      { id: '546761', name: 'Test interface1', workflows: [{ id:'111', name:'processA' }, { id:'222', name:'processB' }], project_key: '$_sys_$' },
      { id: '546763', name: 'Test interface2', workflows: [{ id:'222', name:'processB' }, { id:'333', name:'processC' }] },
      { id: '546762', name: 'Test interface3', workflows: [] },
      { id: '546764', name: 'Test interface5', workflows: [{ id:'111', name:'processC' }] }],
      options:{ fields:[{ id:'111',name:'FieldA' },{ id:'222', name:'Field2' }, { id:'333', name:'Field3' }, { id:'444', name:'Field4' }, { id:'555', name:'Field5' }] }
    };
    return res.status(200).send(results);
  });

  router.post('/project/:key/screen', function(req, res) {
    const results = { ecode: 0, data: { id: 'were', name: 'Test interface4', description:'aaaaaaa' } };
    return res.status(200).send(results);
  });

  router.get('/project/:key/screen/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const { id } = req.params;
    let results = {};
    if (id === '546761') {
      results = { ecode: 0, data: { id: '546761', name: 'Test interface1', description:'aaaaaaaa', fields:[{ id:'111', name:'FieldA', required: true },{ id:'222', name:'FieldB' },{ id:'333', name:'FieldC' }] } };
    } else {
      results = { ecode: 0, data: { id: '546762', name: 'Test interface2', description:'bbbbbb', fields:[{ id:'111', name:'FieldA' },{ id:'222', name:'FieldB', required: true },{ id:'333', name:'FieldC', required: true }] } };
    }
    return res.status(200).send(results);
  });

  router.put('/project/:key/screen/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { id: '546761', name: 'Test interface11111', workflows: [{ id:'111', name:'processA' }, { id:'222', name:'processB' }] } };
    return res.status(200).send(results);
  });

  router.delete('/project/:key/screen/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { id: req.params.id } };
    return res.status(200).send(results);
  });

  router.get('/project/:key/screen/:id/used', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ key: 'demo', name: 'demo1', status: 'active', workflows: [{ id: '1111', name: '1111' }, { id: '2222', name: '2222' }], types: [{ id: '1111', name: '1111' }, { id: '2222', name: '2222' }] }, { key: 'demo2', name: 'demo2', status: 'active', workflows: [{ id: '3333', name: '3333' }, { id: '4444', name: '4444' }], types: [{ id: '1111', name: '1111' }, { id: '2222', name: '2222' }] }, { key: 'demo3', name: 'demo3', workflows: [{ id: '1111', name: '1111' }, { id: '2222', name: '2222' }], issue_count: 7 }] };
    return res.status(200).send(results);
  });

  /************** workflow *****************/
  router.get('/project/:key/workflow', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [
      { id: '546761', name: 'Test process1', latest_modified_time: '2016-03-02 12:09:08', latest_modifier: { id: '1111', name: 'Zhang San' }, steps: 5, project_key: '$_sys_$' },
      { id: '546763', name: 'Test process2', latest_modified_time: '2016-03-02 12:09:08', latest_modifier: { id: '1111', name: 'Zhang San' }, steps: 5 },
      { id: '546762', name: 'Test process3', latest_modified_time: '2016-03-02 12:09:08', latest_modifier: { id: '2222', name: 'Li Si' }, steps: 6 },
      { id: '546764', name: 'Test process5', latest_modified_time: '2016-03-02 12:09:08', latest_modifier: { id: '2222', name: 'Li Si' }, steps: 4 }]
    };
    return res.status(200).send(results);
  });

  router.post('/project/:key/workflow', function(req, res) {
    const results = { ecode: 0, data: { id: 'were', name: 'Test interface4', description:'aaaaaaa' } };
    return res.status(200).send(results);
  });

  router.get('/project/:key/workflow/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const { id } = req.params;
    const results = { ecode: 0, data:{ id: 'aaaa', name: 'Software development', contents: { steps:
    [{
      id: 1,
      name: 'step1',
      state: '1111',
      actions: [
        {
          id: 1,
          name: 'action1',
          restrict_to: {
             conditions: {
               type: 'or',
               list: [
                 {
                   name: 'App\\Workflow\\Util@trueCondition1',
                   args: {
                     owner: 'aaa'
                   }
                 },
                 {
                   name: 'App\\Workflow\\Util@falseCondition2',
                   args: {
                     owner: 'aaa'
                   }
                 }
               ]
             }
           },
          results: [
             {
               step: 2,
               old_status: 'Finished',
               status: 'Underway'
             },
             {
               step: 3,
               old_status: 'Finished',
               status: 'Underway'
             }
           ]
        },
        {
          id: 2,
          name: 'action2',
          results: [
             {
               step: 2,
               old_status: 'Finished',
               status: 'Underway'
             }
           ]
        }
      ]
    },
      {
        id: 2,
        name: 'step2',
        state: '2222',
        actions: [
          {
            id: 3,
            name: 'action3',
            results: [
             {
               step: 3,
               old_status: 'Finished',
               status: 'Underway'
             }
           ]
          }
        ]
      },
      {
        id: 3,
        name: 'step3',
        state: '3333',
        actions: [
          {
            id: 4,
            name: 'action4',
            results: [
             {
               step: 1,
               old_status: 'Finished',
               status: 'Underway'
             }
           ]
          },
          {
            id: 5,
            name: 'action5',
            results: [
             {
               step: 1,
               old_status: 'Finished',
               status: 'Underway'
             }
           ]
          }
        ]
      }] } },
    options: { states : [{ id: '1111', category: 'new', name:'test1' }, { id: '2222', category: 'inprogress',name:'test2' }, { id: '3333', category: 'completed',name:'test3' }], permissions:[{ id: '1111', name:'permission1' }, { id: '2222', name:'permission2' }, { id: '3333', name:'permission3' }], roles: [{ id: '1111', name:'role1' }, { id: '2222', name:'role2' }, { id: '3333', name:'role3' }], screens:[{ id: '1111', name:'screen1' }, { id: '2222', name:'screen2' }, { id: '3333', name:'screen3' }], users: [{ id: '111', name:'Wang Wu', email: 'wangwu@aaa.com' }, { id: '222', name:'Teacher Li', email: 'lilaoshi@aaa.com' }], events: [ { id: '1111', name: 'General event' }, { id: '2222', name: 'ceshi' } ] }
};
    return res.status(200).send(results);
  });

  router.delete('/project/:key/workflow/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { id: req.params.id } };
    return res.status(200).send(results);
  });

  router.get('/project/:key/workflow/:id/used', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ key: 'demo', name: 'demo1', status: 'active', types: [{ id: '1111', name: '1111' }, { id: '2222', name: '2222' }] }, { key: 'demo2', name: 'demo2', status: 'active', types: [{ id: '1111', name: '1111' }, { id: '2222', name: '2222' }] }, { key: 'demo3', name: 'demo3' }] };
    return res.status(200).send(results);
  });

  /*******************state*****************/
  router.get('/project/:key/state', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ id: '546761', category:'new', name: 'In development', project_key: '$_sys_$', description: 'aaaaaaaaaaa' },{ id: '546763', category: 'inprogress', name: 'Be tested', description: 'aaaaaaaaaaa', default: true },{ id: '546762', category: 'completed', name: 'Published' },{ id: '2323', name: 'closed', description: 'ddddddddddd' }] };
    return res.status(200).send(results);
  });

  router.post('/project/:key/state', function(req, res) {
    const results = { ecode: 0, data: { id: 'were', name: '5Cquestion', screen: { id:'222', name:'interface2' }, workflow:{ id:'111', name:'process1' } } };
    return res.status(200).send(results);
  });

  router.get('/project/:key/state/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const { id } = req.params;
    let results = {};
    if (id === '546761') {
      results = { ecode: 0, data: { id: '546761', name:'In development', description: '111aaa' } };
    } else {
      results = { ecode: 0, data: { id: '546762', name: 'Be tested', description: 'adsfs' } };
    }
    return res.status(200).send(results);
  });

  router.put('/project/:key/state/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { id: '546761', name: 'Task1111', screen:{ id:'222', name:'interface2' }, workflow:{ id:'222', name:'process2' } } };
    return res.status(200).send(results);
  });

  router.put('/project/:key/state', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ id: '546763', name: 'need', screen: { id:'222', name:'interface2' }, workflow:{ id:'111', name:'process2' } },{ id: '546761', name: 'Task', screen: { id:'111', name:'interface1' }, workflow:{ id:'111', name:'process1' } },{ id: '546762', name: 'defect', screen: { id:'111', name:'interface1' }, workflow:{ id:'111', name:'process1' } },{ id: '2323', name: 'Subtasks', screen: { id:'111', name:'interface1' }, workflow:{ id:'222', name:'process2' } }] };
    return res.status(200).send(results);
  });

  router.delete('/project/:key/state/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { id: req.params.id } };
    return res.status(200).send(results);
  });

  router.get('/project/:key/state/:id/used', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ key: 'demo', name: 'demo1', status: 'active', workflows: [{ id: '1111', name: '1111' }, { id: '2222', name: '2222' }] }, { key: 'demo2', name: 'demo2', status: 'active', workflows: [{ id: '3333', name: '3333' }, { id: '4444', name: '4444' }] }, { key: 'demo3', name: 'demo3', workflows: [{ id: '1111', name: '1111' }, { id: '2222', name: '2222' }], issue_count: 7 }] };
    return res.status(200).send(results);
  });

  /*******************result*****************/
  router.get('/project/:key/resolution', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ id: '546761', name: 'In development', project_key: '$_sys_$', description: 'aaaaaaaaaaa' },{ id: '546763', name: 'Be tested', description: 'aaaaaaaaaaa', default: true },{ id: '546762', name: 'Published' },{ id: '2323', name: 'closed', description: 'ddddddddddd' }] };
    return res.status(200).send(results);
  });

  router.post('/project/:key/resolution', function(req, res) {
    const results = { ecode: 0, data: { id: 'were', name: '5Cquestion', screen: { id:'222', name:'interface2' }, workflow:{ id:'111', name:'process1' } } };
    return res.status(200).send(results);
  });

  router.get('/project/:key/resolution/:id/used', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ key: 'demo', name: 'demo1', status: 'active', issue_count: 23 }, { key: 'demo2', name: 'demo2', status: 'active', issue_count: 3 }, { key: 'demo3', name: 'demo3', issue_count: 2 }] };
    return res.status(200).send(results);
  });

  router.get('/project/:key/resolution/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const { id } = req.params;
    let results = {};
    if (id === '546761') {
      results = { ecode: 0, data: { id: '546761', name:'In development', description: '111aaa' } };
    } else {
      results = { ecode: 0, data: { id: '546762', name: 'Be tested', description: 'adsfs' } };
    }
    return res.status(200).send(results);
  });

  router.put('/project/:key/resolution/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { id: '546761', name: 'Task1111', screen:{ id:'222', name:'interface2' }, workflow:{ id:'222', name:'process2' } } };
    return res.status(200).send(results);
  });

  router.put('/project/:key/resolution', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ id: '546763', name: 'need', screen: { id:'222', name:'interface2' }, workflow:{ id:'111', name:'process2' } },{ id: '546761', name: 'Task', screen: { id:'111', name:'interface1' }, workflow:{ id:'111', name:'process1' } },{ id: '546762', name: 'defect', screen: { id:'111', name:'interface1' }, workflow:{ id:'111', name:'process1' } },{ id: '2323', name: 'Subtasks', screen: { id:'111', name:'interface1' }, workflow:{ id:'222', name:'process2' } }] };
    return res.status(200).send(results);
  });

  router.delete('/project/:key/resolution/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { id: req.params.id } };
    return res.status(200).send(results);
  });

  /*******************priority*****************/
  router.get('/project/:key/priority', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ id: '546761', name: 'In development', key: '1111', project_key: '$_sys_$', description: 'aaaaaaaaaaa' },{ id: '546763', name: 'Be tested', description: 'aaaaaaaaaaa', default: true },{ id: '546762', name: 'Published' },{ id: '2323', name: 'closed', description: 'ddddddddddd' }] };
    return res.status(200).send(results);
  });

  router.post('/project/:key/priority', function(req, res) {
    const results = { ecode: 0, data: { id: 'were', name: '5Cquestion', screen: { id:'222', name:'interface2' }, workflow:{ id:'111', name:'process1' } } };
    return res.status(200).send(results);
  });

  router.post('/project/:key/priority/batch', function(req, res) {
    const results = { ecode: 0, data: { sequence: null, default: '546761' } };
    return res.status(200).send(results);
  });

  router.get('/project/:key/priority/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const { id } = req.params;
    let results = {};
    if (id === '546761') {
      results = { ecode: 0, data: { id: '546761', name:'In development', description: '111aaa' } };
    } else {
      results = { ecode: 0, data: { id: '546762', name: 'Be tested', description: 'adsfs' } };
    }
    return res.status(200).send(results);
  });

  router.put('/project/:key/priority/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { id: '546761', name: 'Task1111', screen:{ id:'222', name:'interface2' }, workflow:{ id:'222', name:'process2' } } };
    return res.status(200).send(results);
  });

  router.put('/project/:key/priority', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ id: '546763', name: 'need', screen: { id:'222', name:'interface2' }, workflow:{ id:'111', name:'process2' } },{ id: '546761', name: 'Task', screen: { id:'111', name:'interface1' }, workflow:{ id:'111', name:'process1' } },{ id: '546762', name: 'defect', screen: { id:'111', name:'interface1' }, workflow:{ id:'111', name:'process1' } },{ id: '2323', name: 'Subtasks', screen: { id:'111', name:'interface1' }, workflow:{ id:'222', name:'process2' } }] };
    return res.status(200).send(results);
  });

  router.delete('/project/:key/priority/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { id: req.params.id } };
    return res.status(200).send(results);
  });

  /*******************permission*****************/
  router.get('/project/:key/role', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ id: '546761', project_key: '$_sys_$', name: 'project manager', description: '111aaa', permissions:[ 'create_issue', 'edit_issue', 'add_comments', 'edit_comments', 'delete_comments', 'manage_project'], users: [{ id: '1111', name: 'wangwu', email: 'wangwu@aa.com' }, { id: '2222', name: 'lihui', email: 'lihui@aa.com' }] }, { id: '546762', name: 'Product manager', permissions:['create_issue', 'edit_issue'], users: [{ id: '1111', name: 'wangwu', email: 'wangwu@aa.com' }] }] };
    return res.status(200).send(results);
  });

  router.get('/project/:key/team', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ id: '546761', name: 'project manager', description: '111aaa', permissions:[ 'create_issue', 'edit_issue'], users: [{ id: '1111', name: 'wangwu', email: 'wangwu@aa.com' }, { id: '2222', name: 'lihui', email: 'lihui@aa.com' }] }, { id: '546762', name: 'Product manager', permissions:['create_issue', 'edit_issue'], users: [{ id: '1111', name: 'wangwu', email: 'wangwu@aa.com' }] }] };
    return res.status(200).send(results);
  });

  router.post('/project/:key/role', function(req, res) {
    const results = { ecode: 0, data: { id: 'were', name: '5Cquestion', screen: { id:'222', name:'interface2' }, workflow:{ id:'111', name:'process1' } } };
    return res.status(200).send(results);
  });

  router.get('/project/:key/role/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const { id } = req.params;
    let results = {};
    if (id === '546761') {
      results = { ecode: 0, data: { id: '546761', name:'project manager', description: '111aaa', permissions:['createIssue', 'projectConfig'] } };
    } else {
      results = { ecode: 0, data: { id: '546762', name: 'Product manager', description: 'adsfs', permissions:['createIssue', 'viewWorkflow'] } };
    }
    return res.status(200).send(results);
  });

  router.put('/project/:key/role/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { id: '546761', name: 'Task1111', screen:{ id:'222', name:'interface2' }, workflow:{ id:'222', name:'process2' } } };
    return res.status(200).send(results);
  });

  router.put('/project/:key/role', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 5000);
    const results = { ecode: 0, data: [{ id: '546763', name: 'need', screen: { id:'222', name:'interface2' }, workflow:{ id:'111', name:'process2' } },{ id: '546761', name: 'Task', screen: { id:'111', name:'interface1' }, workflow:{ id:'111', name:'process1' } },{ id: '546762', name: 'defect', screen: { id:'111', name:'interface1' }, workflow:{ id:'111', name:'process1' } },{ id: '2323', name: 'Subtasks', screen: { id:'111', name:'interface1' }, workflow:{ id:'222', name:'process2' } }] };
    return res.status(200).send(results);
  });

  router.delete('/project/:key/role/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { id: req.params.id } };
    return res.status(200).send(results);
  });

  /*******************roleactor*****************/
  router.get('/project/:key/roleactor', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ id: '546761', role: { id: '2222', name: 'project manager' } }, { id: '546762', role: { id: '3333', name: 'Product manager' } }] };
    return res.status(200).send(results);
  });

  router.put('/project/:key/roleactor/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { id: '546761', name: 'Task1111', screen:{ id:'222', name:'interface2' }, workflow:{ id:'222', name:'process2' } } };
    return res.status(200).send(results);
  });

  router.post('/session', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { user: { id: 'nhy67ujm', email:'wangwu@aaa.com', first_name: 'wangwu', avatar: '', permissions: { sys_admin: true }, latest_access_url: '/project/boba/summary' } } };
    return res.status(200).send(results);
  });

  router.get('/session', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { user: { id: 'nhy67ujm', email:'wangwu@aaa.com', first_name: 'wangwu', avatar: 'http://tp1.sinaimg.cn/2214067364/180/5605327547/1', permissions: { sys_admin: true } } } };
    return res.status(200).send(results);
  });

  router.get('/user', function(req, res) {
    const results = { ecode: 0, data: [{ id: '1111', name: 'wangwu' }, { id: '2222', name: 'lihui' }] };
    return res.status(200).send(results);
  });

  router.get('/users/:seed', function(req, res) {
    const { seed } = req.params;
    const [ result ] = simplifyUsers(users.filter(user => user.seed === seed));

    if (!result) return res.status(422).send({ error: { message: 'User not found' } });
    return res.status(200).send(result);
  });

  router.get('/readme', async function(req, res) {
    const readme = await readFile(path.resolve(__dirname, '../../README.md'), 'utf8');
    return res.status(200).send(marked(readme));
  });

  router.post('/project/:key/file', function(req, res) {
    return res.status(200).send({ ecode: 0, data: { field:'attachments', file: { id: '546761' } } });
  });

  router.get('/tmpfile', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { fid: 'aaaa', fname: 'zzzz.xlxs' } };
    return results;
  });

  /*******************events*****************/
  router.get('/project/:key/events', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ id: '546761', name: 'Create a problem', notifications: [  'assignee', 'reporter','project_principal', { key: 'role', value: '1111' }, { key: 'single_user_field', value: '1111' } ] },{ id: '546763', name: 'Editing problem', notifications: [ 'assignee', 'reporter', 'project_principal', { key: 'multi_user_field', value: '2222' } ] },{ id: '546762', name: 'Delete problem' },{ id: '2323', name: 'Add notes', notifications: [ 'assignee', 'reporter', 'module_principal' ] }], options:{ users: [{ id: '111', name:'Wang Wu', email:'wangwu@aaa.com' }, { id: '222', name:'Teacher Li', email: 'lilaoshi@aaa.com' }], roles: [{ id: '1111', name:'role1' }, { id: '2222', name:'role2' }, { id: '3333', name:'role3' }], single_user_fields: [{ id: '1111', name:'field1' }, { id: '2222', name:'field2' }, { id: '3333', name:'field3' }], multi_user_fields: [{ id: '1111', name:'field1' }, { id: '2222', name:'field2' }, { id: '3333', name:'field3' }] } };
    return res.status(200).send(results);
  });

  router.post('/project/:key/events', function(req, res) {
    const results = { ecode: 0, data: { id: 'were', name: '5Cquestion', screen: { id:'222', name:'interface2' }, workflow:{ id:'111', name:'process1' } } };
    return res.status(200).send(results);
  });
  /******************Events*************/

  /******************Activity***************/
  router.get('/project/:key/activity', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ id: '54dd6761', event_key: 'del_file', user : { id : '57afced21d41c8174d7421c1', name : 'Wang Wu', email : 'wangwu@aaa.com' }, data : 'aaa.jpg', issue: { id: '1111', no: '23', title: '1111111111111' }, created_at: 1520943111 }, { id: '546763', event_key: 'add_file', user : { id : '57afced21d41c8174d7421c1', name : 'Wang Wu', email : 'wangwu@aaa.com' }, data : 'bbb.jpg', issue: { id: '1111', no:'45', title: '1111111111111' }, created_at: 1520929420 }, { id: '546761', event_key: 'create_issue', user : { id : '57afced21d41c8174d7421c1', name : 'Wang Wu', email : 'wangwu@aaa.com' }, issue: { id: '1111', no:'324', title: '1111111111111' }, data: '', created_at: 1520922345 }, { id: '54s6763', user : { id : '57afced21d41c8174d7421c1', name : 'Wang Wu', email : 'wangwu@aaa.com' }, event_key: 'edit_issue', data: [{ field : 'theme', after_value : 'jjjjjjj', type : 'Text' }, { field : 'priority', after_value : 'generally', type : 'Select' } ], issue: { id: '1111', no: '77', title: '1111111111111' }, created_at: 1520922345 }], options: { current_time: 1520943279 } };
    return res.status(200).send(results);
  });
  /******************Activity***************/

  /******************kanban***************/
  router.get('/project/:key/kanban', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results={ ecode: 0, data: [{ id: '1111', name: 'Test test11', type: 'kanban', filters: [{ no: 2, name: '1111', query:{ assignee: [ 'me', 'ttt' ] } }, { no: 3, name: '2222', query:{ updated_at: '1w' } }, { no: 1, name: '3333', query: { created_at: '1w' } }], columns: [{ name: 'Pending', no: 1, states: ['546761','546762'], max: 4, min: 2 }, { name:'Processing', no: 0, states: [ '546763' ], max: 4 }, { name:'closure', no: 2, states:[], min: 1 }], query: { subtask: false, type: [ '1111', '3333' ] }, last_access_time: 11111111, display_fields: ['priority', 'labels', 'aa'] }, { id: '2222', name:'2222', type: 'scrum', filters: [{ no: 1, name: 'mmmmmmm', query:{ assignee: [ 'me','ttt' ] } }, { no: 2, name: 'nnnnnnn', query:{ updated_at: '1w' } }, { no: 4, name: 'tttt', query: { created_at: '1w' } }], columns: [{ name: 'Pending22', no: 0, states: [ '546761'] }, { name:'Processing22', no: 2, states: [ '546762' ] }, { name:'closure22', no: 5, states:[ '546763' ] }], query: { subtask: true, type: [ '1111', '2222' ] } }], options: { completed_sprint_num: 4, sprints: [{ no: 3, name: 'Sprint 3', start_time:1474642399, complete_time:1474642399, status: 'active', issues:[1,2] }, { no: 4, name: 'aabb', status: 'waiting', issues: [3,4] }], epics: [{ id: '1111', bgColor: '#4a6785', name: 'Test test11' }, { id: '2222', bgColor: '#8eb021', name: 'Test test22' }], versions:[{ id: '1111', name: '1111' }, { id: '2222', name: '2222' }] } };
    return res.status(200).send(results);
  });

  router.get('/project/:key/sprint/:sid', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results={ ecode: 0, data:{ no: 3, start_time:1474642399, complete_time:1474652399, completed_issues: [1555, 9999, 3, 4, 1], incompleted_issues:[365, 2, 8, 7] } };
    return res.status(200).send(results);
  });

  router.post('/project/:key/sprint/:sid/publish', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results={ ecode: 0, data:[{ no: 3, start_time:1474642399, complete_time:1474642399, status: 'active', issues:[1,2] }, { no: 4, status: 'waiting', issues: [3,4] }] };
    return res.status(200).send(results);
  });

  router.post('/project/:key/sprint/moveissue', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results={ ecode: 0, data:[{ no: 3, start_time:1474642399, complete_time:1474642399, status: 'active', issues:[1,2] }, { no: 4, status: 'waiting', issues: [3,4] }] };
    return res.status(200).send(results);
  });

  router.post('/project/:key/sprint/:sid/complete', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results={ ecode: 0, data:[{ no: 4, status: 'waiting', issues: [3,4] }] };
    return res.status(200).send(results);
  });

  router.delete('/project/:key/sprint/:sid', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results={ ecode: 0, data:[{ no: 3, start_time:1474642399, complete_time:1474642399, status: 'active', issues:[1,2] }] };
    return res.status(200).send(results);
  });

  router.get('/project/:key/sprint/:sid/log', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results={ ecode: 0, data:{ issue_count: { guideline: [{ day: '', value: 18 }, { day: '05/02', value: 15 }, { day: '05/03', value: 12 }, { day: '05/04', value: 9 }, { day: '05/05', value: 9, notWorking: 1 }, { day: '05/06', value: 6 }, { day: '05/07', value: 3 }, { day: '05/08', value: 0 }], remaining: [{ day: '', value: 18 }, { day: '05/02', value: 16 }, { day: '05/03', value: 10 }, { day: '05/04', value: 5 }] }, story_points: { guideline: [{ day: '', value: 12 }, { day: '05/02', value: 10 }, { day: '05/03', value: 8 }, { day: '05/04', value: 6 }, { day: '05/05', value: 6, notWorking: 1 }, { day: '05/06', value: 4 }, { day: '05/07', value: 2 }, { day: '05/08', value: 0 }], remaining: [{ day: '', value: 10.3 }, { day: '05/02', value: 6.5 }, { day: '05/03', value: 4.6 }, { day: '05/04', value: 3 }] } } };
    return res.status(200).send(results);
  });

  router.get('/project/:key/epic', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results={ ecode: 0, data:[{ id: '1111', name: 'test111', bgColor: '#4a6785', issues:{ completed: 13, incompleted: 12, inestimable: 3 } }, { id: '2222', name: 'test222', bgColor: '#8eb021', issues:{ completed: 15, incompleted: 2, inestimable: 3 } }] };
    return res.status(200).send(results);
  });

  router.post('/project/:key/epic', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results={ ecode: 0, data:{ id: '3333', name: 'test333', bgColor: '#f15c75' } };
    return res.status(200).send(results);
  });

  router.put('/project/:key/epic/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);    
    const results={ ecode: 0, data:{ id: '2222', name: 'test2222222', bgColor: '#ccc' } };
    return res.status(200).send(results);
  });

  router.delete('/project/:key/epic/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);    
    const results={ ecode: 0, data:{ id: '2222' } };
    return res.status(200).send(results);
  });

  router.post('/project/:key/kanban', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results={ ecode: 0, data: { id: '333', name: 'Test test33', type: 'kanban' } };
    return res.status(200).send(results);
  });

  router.delete('/project/:key/kanban/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results={ ecode: 0, data: { id: '333' } };
    return res.status(200).send(results);
  });

  router.put('/project/:key/kanban/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results={ ecode: 0, data: { id: '2222', name:'2222', type: 'scrum', filters: [{ no: 1, name: 'mmmmmmm', query:{ assignee: [ 'me','ttt' ] } }, { no: 2, name: 'nnnnnnn', query:{ updated_at: '1w' } }, { no: 4, name: 'tttt', query: { created_at: '1w' } }], columns: [{ name: 'Pending22', no: 0, states: [ '546761'] }, { name:'Processing22', no: 2, states: [ '546762' ] }], query: { subtask: true, type: [ '1111', '2222' ] }, rank: {} } };
    return res.status(200).send(results);
  });

  router.get('/project/:key/kanban/:kid/rank', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { rank: [9999, 1555, 365, 2] } };
    return res.status(200).send(results);
  });
  router.post('/project/:key/kanban/:kid/rank', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { rank: [9999, 1555, 365, 2] } };
    return res.status(200).send(results);
  });
  /******************kanban***************/

  /******************document*****************/
  router.get('/project/:key/document/search/path', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results={ ecode: 0, data: [{ id: '1111', 'name': '/aaa/bbb/ccc/ccc' }, { id: '2222', 'name': '/1111/2222/333/444' }] };
    return res.status(200).send(results);
  });

  router.get('/project/:key/document/options', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results={ ecode: 0, data:{ uploader: [{ id: '1111', 'name': 'Wang Wu' }, { id: '2222', 'name': 'Teacher Wong' }] } };
    return res.status(200).send(results);
  });

  router.post('/project/:key/document/0/fileupload', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data:{ name: 'ffff.pdf', id: '6666', uploader: { id: '2222', name: 'Teacher Wong' }, uploaded_at: 1533636586, size: '123M', parent: '1111', index: '1111', versions: [] } };
    return res.status(200).send(results);
  });

  router.put('/project/:key/document/5555', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results={ ecode: 0, data: { name: 'Test document222', id: '5555', d:1 } };
    return res.status(200).send(results);
  });

  router.post('/project/:key/document/directory', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results={ ecode: 0, data: { name: 'Test document', id: '6666', d:1, parent: '1111' } };
    return res.status(200).send(results);
  });

  router.get('/project/:key/document/directory/111', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results={ ecode: 0, data:[{ name: 'aaaa.pdf', id: '1111', uploader: { id: '1111', name: 'Wang Wu' }, uploaded_at: 1533636586, size: 123, parent: '1111', index: '1111', versions: [] }, { name: 'bbbb.pdf', id: '2222', uploader: { id: '1111', name: 'Wang Wu' }, uploaded_at: 1533636586, size: 64652, parent: '1111', index: '2222', versions: [] }, { name: 'cccc.xlsx', id: '3333', uploader: { id: '1111', name: 'Wang Wu' }, uploaded_at: 1533636586, size: 28, parent: '1111', index: '1111', versions: [] }, { name: 'eeee.jpg', id: '4444', uploader: { id: '2222', name: 'Teacher Wong' }, uploaded_at: 1533636586, size: 10240, parent: '1111', index: '1111', versions: [] }], options: { path:[{ id: '0', name: 'root' }, { id: '1111', name: 'aaaa' }] } };
    return res.status(200).send(results);
  });

  router.get('/project/:key/document/directory/0', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results={ ecode: 0, data:[{ name: 'Design documentation', id: '5555', d:1 }, { name: 'aaaa.docx', id: '1111', uploader: { id: '1111', name: 'Wang Wu' }, uploaded_at: 1533636589, size: 123, parent: '0', index: '1111', versions: [] }, { name: 'bbbb.docx', id: '2222', uploader: { id: '1111', name: 'Wang Wu' }, uploaded_at: 1533636588, size: 10240, parent: '0', index: '2222', versions: [] }, { name: 'cccc.xlsx', id: '3333', uploader: { id: '1111', name: 'Wang Wu' }, uploaded_at: 1533636587, size: 2346111, parent: '0', index: '1111', versions: [] }, { name: 'eeee.jpg', id: '4444', uploader: { id: '2222', name: 'Teacher Wong' }, uploaded_at: 1533636586, size: 1233, parent: '1111', index: '1111', versions: [] }], options: { path:[{ id: '0', name: 'root' }, { id: '111', name: 'aaaa' }, { id: '222', name: 'bbbb' }] } };
    return res.status(200).send(results);
  });

  router.get('/project/:key/document/:id/dirs', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);

    const results = { ecode: 0, data: [{ id: '111111', name: '111111' }, { id: '222222', name: '222222' }] };
    return res.status(200).send(results);
  });

  router.get('/project/:key/document/dirtree', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);

    const testdata = {
      name: 'Root directory',
      id: '0',
      toggled: true,
      children: [
    {
      id: '2222',
      name: 'Test catalog two',
      children: [
        { name: 'child1', id: '11111' },
        { name: 'child2', id: '22222' }
      ]
    },
    {
      name: 'Test catalog',
      id: '1111',
      children: []
    },
    {
      id: '3333',
      name: 'Meeting minutes',
      children: [
        {
          name: 'Various configurations',
          children: [
            { name: 'nested child 1', id: '33333' },
            { name: 'nested child 2', id: '44444' }
          ]
        }
      ]
    }
  ]
    };
    const results = { ecode: 0, data: testdata };

    return res.status(200).send(results);
  });
  /******************document*****************/

  /******************wiki*****************/
  router.get('/project/:key/wiki/directory/0', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results={ ecode: 0, data:[{ name: 'Design documentation', id: '5555', d:1 }, { name: 'aaaa', id: '1111', creator: { id: '1111', name: 'Wang Wu' }, created_at: 1533636586, size: 123, parent: '0', index: '1111', versions: [] }, { name: 'bbbb', id: '2222', creator: { id: '1111', name: 'Wang Wu' }, created_at: 1533636586, size: 10240, parent: '0', attachments: [ { name: 'aaaa.docx', id: '1111', uploader: { id: '1111', name: 'Wang Wu' }, uploaded_at: 1533636586, size: 123 }, { name: 'bbbb.docx', id: '1111', uploader: { id: '1111', name: 'Wang Wu' }, uploaded_at: 1533636586, size: 123 } ], checkin: { user: { id: '2222', name: 'Teacher Wong', 'email': 'aa@aa.com' }, at: 1533636580 }, index: '2222', versions: [] }, { name: 'cccc', id: '3333', creator: { id: '1111', name: 'Wang Wu' }, created_at: 1533636586, size: 2346111, parent: '0', index: '1111', versions: [] }, { name: 'eeee', id: '4444', creator: { id: '2222', name: 'Teacher Wong' }, created_at: 1533636586, size: 1233, parent: '1111', index: '1111', versions: [] }], options: { path:[{ id: '0', name: 'root' }, { id: '111', name: 'aaaa' }, { id: '222', name: 'bbbb' }], home: { id: '1111', name: 'Home', contents: '## aaa\n## bb\n## bb\n## bb\n## bb\n## bb\n## bb\n## bb\n## bb\n## bb\n## bb\n## bb\n## bb\n## bb\n## bb\n## bb', creator: { id: '1111', name: 'Wang Wu' }, created_at: 1533636586 } } };
    return res.status(200).send(results);
  });
  router.get('/project/:key/wiki/directory/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results={ ecode: 0, data:[{ name: 'aaaa', id: '1111', creator: { id: '1111', name: 'Wang Wu' }, created_at: 1533636586, size: 123, parent: '1111', index: '1111', versions: [] }, { name: 'bbbb', id: '2222', creator: { id: '1111', name: 'Wang Wu' }, created_at: 1533636586, size: 64652, parent: '1111', index: '2222', versions: [] }, { name: 'cccc', id: '3333', creator: { id: '1111', name: 'Wang Wu' }, created_at: 1533636586, size: 28, parent: '1111', index: '1111', versions: [] }, { name: 'eeee', id: '4444', creator: { id: '2222', name: 'Teacher Wong' }, created_at: 1533636586, size: 10240, parent: '1111', index: '1111', versions: [] }], options: { path:[{ id: '0', name: 'root' }, { id: '1111', name: 'aaaa' }] } };
    return res.status(200).send(results);
  });
  router.get('/project/:key/wiki/:id/checkout', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results={ ecode: 0, data: { id: '1111', name: 'Test test test', contents:'## aaa', updated_at: 1533636580, version: 2, editor: { id: '2222', name: 'Teacher Wong', 'email': 'aa@aa.com' }, attachments: [ { name: 'aaaa.docx', id: '1111', uploader: { id: '1111', name: 'Wang Wu' }, uploaded_at: 1533636586, size: 123 }, { name: 'bbbb.docx', id: '1111', uploader: { id: '1111', name: 'Wang Wu' }, uploaded_at: 1533636586, size: 123 } ], history:[{ id: '1111', version: 2, editor: { id: '111', name: 'Wang Wu', 'email': 'aa@aa.com' }, updated_at: 1533636580 }, { id: '2222', version: 1, editor: { id: '2222', name: 'Teacher Wong', 'email': 'aa@aa.com' }, updated_at: 1533636586 }] }, options: { path:[{ id: '0', name: 'root' }, { id: '111', name: 'aaaa' }, { id: '222', name: 'bbbb' }] } };
    return res.status(200).send(results);
  });
  router.get('/project/:key/wiki/:id/checkin', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results={ ecode: 0, data: { id: '1111', name: 'Test test test', contents:'## aaa', updated_at: 1533636580, version: 2, editor: { id: '2222', name: 'Teacher Wong', 'email': 'aa@aa.com' }, checkin: { user: { id: '2222', name: 'Teacher Wong', 'email': 'aa@aa.com' }, at: 1533636580 }, attachments: [ { name: 'aaaa.docx', id: '1111', uploader: { id: '1111', name: 'Wang Wu' }, uploaded_at: 1533636586, size: 123 }, { name: 'bbbb.docx', id: '1111', uploader: { id: '1111', name: 'Wang Wu' }, uploaded_at: 1533636586, size: 123 } ], history:[{ id: '1111', version: 2, editor: { id: '111', name: 'Wang Wu', 'email': 'aa@aa.com' }, updated_at: 1533636580 }, { id: '2222', version: 1, editor: { id: '2222', name: 'Teacher Wong', 'email': 'aa@aa.com' }, updated_at: 1533636586 }] }, options: { path:[{ id: '0', name: 'root' }, { id: '111', name: 'aaaa' }, { id: '222', name: 'bbbb' }] } };
    return res.status(200).send(results);
  });

  router.get('/project/:key/wiki/:id/dirs', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);

    const results = { ecode: 0, data: [{ id: '111111', name: '111111' }, { id: '222222', name: '222222' }] };
    return res.status(200).send(results);
  });

  router.get('/project/:key/wiki/dirtree', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);

    const testdata = {
      name: 'Root directory',
      d: 1,
      id: '0',
      toggled: true,
      children: [
    {
      id: '2222',
      d: 1,
      name: 'Test catalog two',
      children: [
        { name: 'child1', id: '11111' },
        { name: 'child2', id: '22222' }
      ]
    },
    {
      name: 'Test catalog',
      id: '1111',
      d: 1,
      children: []
    },
    {
      id: '3333',
      d: 1,
      name: 'Meeting minutes',
      children: [
        {
          name: 'Various configurations',
          d: 1,
          children: [
            { name: 'nested child 1', id: '33333' },
            { name: 'nested child 2', id: '44444' }
          ]
        }
      ]
    }
  ]
    };
    const results = { ecode: 0, data: testdata };

    return res.status(200).send(results);
  });

  router.get('/project/:key/wiki/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results={ ecode: 0, data: { id: '1111', name: 'Test test test', contents:'## aaa\n## bb\n## bb\n## bb\n## bb\n## bb\n## bb\n## bb\n## bb\n## bb\n## bb\n## bb\n## bb\n## bb\n## bb\n## bb', creator: { id: '1111', name: 'Wang Wu' }, created_at: 1533636586, updated_at: 1533636580, version: 3, editor: { id: '2222', name: 'Teacher Wong', 'email': 'aa@aa.com' }, checkin2: { user: { id: '2222', name: 'Teacher Wong', 'email': 'aa@aa.com' }, at: 1533636580 }, attachments: [ { name: 'aaaa.docx', id: '1111', uploader: { id: '1111', name: 'Wang Wu' }, uploaded_at: 1533636586, size: 123 }, { name: 'bbbb.docx', id: '1111', uploader: { id: '1111', name: 'Wang Wu' }, uploaded_at: 1533636586, size: 123 } ], versions:[{ id: '1111', version: 2, editor: { id: '111', name: 'Wang Wu', 'email': 'aa@aa.com' }, updated_at: 1533636580 }, { id: '2222', version: 1, editor: { id: '2222', name: 'Teacher Wong', 'email': 'aa@aa.com' }, updated_at: 1533636586 }] }, options: { path:[{ id: '0', name: 'root' }, { id: '111', name: 'aaaa' }, { id: '222', name: 'bbbb' }] } };
    return res.status(200).send(results);
  });

  router.post('/project/:key/wiki', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { id: '4444', name: 'Test test test2222', contents:'## aaa', updated_at: 1533636580, version: 1, creator: { id: '2222', name: 'Teacher Wong', 'email': 'aa@aa.com' }, created_at: 1533636586 } };
    return res.status(200).send(results);
  });

  router.put('/project/:key/wiki/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { id: '4444', name: 'Test test test2222', contents:'## aaa', updated_at: 1533636580, version: 1, creator: { id: '2222', name: 'Teacher Wong', 'email': 'aa@aa.com' }, created_at: 1533636586 } };
    return res.status(200).send(results);
  });

  router.delete('/project/:key/wiki/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: '1111' };
    return res.status(200).send(results);
  });

  /******************wiki*****************/

  /******************report*****************/

  router.get('/project/:key/report/index', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode:0, data: { 
    	    issues: [{ id: '1111', name: 'question type', query: { stat_x: 'type', stat_y: 'type' } }, { id: '2222', name: 'priority', query: { stat_x: 'priority', stat_y: 'priority', created_at: '-3m' } }, { id: '3333', name: 'tttttt', query: {} }, { id: '4444', name: 'tttttt', query: {} }, { id: '5555', name: 'tttttt', query: {} }, { id: '6666', name: 'tttttt', query: {} }], 
    	    trend: [{ id: '1111', name: 'Near January', query: { stat_time: '1m' } }], 
    	    worklog: [{ id: '1111', name: 'Near January', query: { recorded_at: '1m' } }, { id: '2222', name: 'create3Month', query: { created_at: '-3m' } }, { id: '3333', name: 'tttttt', query: {} }, { id: '4444', name: 'tttttt', query: {} }], 
    	    timetracks: [ { id: '1111', name: 'Near January', query: { resolution: 'Unresolved' } }, { id: '2222', name: '44444', query: { created_at: '1m' } } ], 
    	    regressions: [ { id: '1111', name: 'have not decide', query: { resolution: 'Unresolved' } }, { id: '2222', name: '44444', query: { created_at: '1m' } } ], 
    	    others: [] } };

    return res.status(200).send(results);
  });

  router.post('/project/:key/report/filter', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);

    const results = { ecode:0, data: [{ id: '1111', name: 'question type', query: { row: 'type', column: 'type' } }, { id: '2222', name: 'priority', query: { row: 'priority', column: 'priority', created_at: '-3m' } }, { id: '3333', name: 'tttttt', query: {} }, { id: '4444', name: 'tttttt', query: {} }] };
    return res.status(200).send(results);
  });

  router.post('/project/:key/report/filter/reset', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);

    const results = { ecode:0, data: [{ id: '1111', name: 'question type', query: { row: 'type', column: 'type' } }, { id: '2222', name: 'priority', query: { row: 'priority', column: 'priority', created_at: '-3m' } }, { id: '3333', name: 'tttttt', query: {} }, { id: '4444', name: 'tttttt', query: {} }, { id: '5555', name: 'tttttt', query: {} }, { id: '6666', name: 'tttttt', query: {} }] };

    return res.status(200).send(results);
  });

  router.get('/project/:key/report/index', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { issue:[], trend: [], worklog: [], track: [], compare: [], other: [] } };
    return res.status(200).send(results);
  });

  router.get('/project/:key/report/worklog', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results={ ecode: 0, data:[{ value: 33, user: { name: 'Zhang San', id: 'zhangsan' } }, { value: 10, user: { name: 'Li Si', id: 'lisi' } }, { value: 23, user: { name: 'Wang Wu', id: 'wangwu' } }, { value: 123, user: { name: 'High six', id: 'gaoliu' } }, { value: 33, user: { name: 'Zhang San', id: 'zhangsan' } }, { value: 10, user: { name: 'Li Si', id: 'lisi' } }, { value: 23, user: { name: 'Wang Wu', id: 'wangwu' } }, { value: 123, user: { name: 'High six', id: 'gaoliu' } }, { value: 153, user: { name: 'others', id: 'others' } }], options:{ d2h: 8, w2d: 5 } };
    return res.status(200).send(results);
  });

  router.get('/project/:key/report/worklog/list', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [
    { no:1555, id: '546761', type:'1111', title: 'National dialed type project adds the responsible person in the task without having to select', state:'546761', total_value: 34 },
    { no:10, id: '546762', type:'2222', title: 'National dialed type project adds the responsible person in the task without having to select22222', state:'546762', total_value: 24 },
    { no:12, id: '546763', type:'1111', title: 'National dialed type project adds the responsible person in the task without having to select333333', state:'546763', total_value: 12 } 
    ] };
    return res.status(200).send(results);
  });

  router.get('/project/:key/report/worklog/issue/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { 
      total: [
    { id: '1111', started_at: 1478414469, adjust_type: '1', spend: '3d 4h', spend_m: 200, comments: '1111111', recorder: { id:'aaa', name:'Wang Wu' }, recorded_at: 1478414469 }, 
    { id: '2222', started_at: 1478414469, adjust_type: '2', spend: '6h', spend_m: 120, comments: '2222222', recorder: { id:'aaa', name:'Wang Wu' }, recorded_at: 1478414469 }, 
    { id: '3333', started_at: 1478414469, adjust_type: 1, spend: '3d 4h 5m', spend_m: 1200, comments: '333333',recorder: { id:'aaa', name:'Wang Wu' }, recorded_at: 1478414469 },
    { id: '4444', started_at: 1478414469, adjust_type: 1, spend: '3d 4h 5m', spend_m: 1200, comments: '333333',recorder: { id:'aaa', name:'Wang Wu' }, recorded_at: 1478414469 },
    { id: '5555', started_at: 1478414469, adjust_type: 1, spend: '3d 4h 5m', spend_m: 1200, comments: '333\r\n333\r\n3333\r\n44444\r\n5555\r\n6666\r\nTest test\r\n\r\n\r\nTest test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test\r\nTest test\r\nTest test\r\nTest test\r\nTest test\r\nTest test',recorder: { id:'aaa', name:'Wang Wu' }, recorded_at: 1478414469 },
    { id: '6666', started_at: 1478414469, adjust_type: 1, spend: '3d 4h 5m', spend_m: 1200, comments: '333333',recorder: { id:'aaa', name:'Wang Wu' }, recorded_at: 1478414469 }],
      parts: [     
    { id: '1111', started_at: 1478414469, adjust_type: '1', spend: '3d 4h', spend_m: 200, comments: '111\r\n1111', recorder: { id:'aaa', name:'Wang Wu' }, recorded_at: 1478414469 }, 
    { id: '3333', started_at: 1478414469, adjust_type: 1, spend: '3d 4h 5m', spend_m: 1200, comments: '333333',recorder: { id:'aaa', name:'Wang Wu' }, recorded_at: 1478414469 }] } };
    return res.status(200).send(results);
  });

  router.get('/project/:key/report/trend', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results={ ecode: 0, data: [{ category: '2019/05/02', new: 15, resolved: 10, closed: 4 }, { category: '2019/05/03', new: 1, resolved: 6, closed: 14 }, { category: '2019/05/04', new: 5, resolved: 10, closed: 2 }, { category: '2019/05/05', new: 7, resolved: 10, closed: 6, notWorking: 1 }, { category: '2019/05/06', new: 5, resolved: 8, closed: 4 }, { category: '2019/05/07', new: 9, resolved: 9, closed: 9 }, { category: '2019/05/08', new: 8, resolved: 5, closed: 4 }], options: { trend_start_stat_date: '2019/05/02' } };
    return res.status(200).send(results);
  });

  router.get('/project/:key/report/timetracks/issue/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [
    { id: '1111', started_at: 1478414469, adjust_type: '1', spend: '3d 4h', spend_m: 200, comments: '1111111', recorder: { id:'aaa', name:'Wang Wu' }, recorded_at: 1478414469 }, 
    { id: '2222', started_at: 1478414469, adjust_type: '2', spend: '6h', spend_m: 120, comments: '2222222', recorder: { id:'aaa', name:'Wang Wu' }, recorded_at: 1478414469 }, 
    { id: '3333', started_at: 1478414469, adjust_type: 1, spend: '3d 4h 5m', spend_m: 1200, comments: '333333',recorder: { id:'aaa', name:'Wang Wu' }, recorded_at: 1478414469 },
    { id: '4444', started_at: 1478414469, adjust_type: 1, spend: '3d 4h 5m', spend_m: 1200, comments: '333333',recorder: { id:'aaa', name:'Wang Wu' }, recorded_at: 1478414469 },
    { id: '5555', started_at: 1478414469, adjust_type: 1, spend: '3d 4h 5m', spend_m: 1200, comments: '333\r\n333\r\n3333\r\n44444\r\n5555\r\n6666\r\nTest test\r\n\r\n\r\nTest test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test\r\nTest test\r\nTest test\r\nTest test\r\nTest test\r\nTest test',recorder: { id:'aaa', name:'Wang Wu' }, recorded_at: 1478414469 },
    { id: '6666', started_at: 1478414469, adjust_type: 1, spend: '3d 4h 5m', spend_m: 1200, comments: '333333',recorder: { id:'aaa', name:'Wang Wu' }, recorded_at: 1478414469 }] };
    return res.status(200).send(results);
  });

  router.get('/project/:key/report/timetracks', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [
    { no:1555, id: 's546761', type:'1111', title: 'National dialed type project adds the responsible person in the task without having to select', state:'546761', origin: '2d 4h', origin_m: 1200, spend: '3h', spend_m: 180, left: '2d', left_m: 960 },
    { no:10, id: 'b546762', type:'2222', title: 'National dialed type project adds the responsible person in the task without having to select22222', state:'546762', origin: '4d', origin_m: 1920,spend: '3h', spend_m: 180, left: '2d', left_m: 960 },
    { no:155, id: 'c546761', type:'1111', title: 'National dialed type project adds the responsible person in the task without having to select', state:'546761', origin: '2d 4h', origin_m: 1200, spend: '3h', spend_m: 180, left: '2d', left_m: 960 },
    { no:102, id: 'd546762', type:'2222', title: 'National dialed type project adds the responsible person in the task without having to select22222', state:'546762', origin: '4d', origin_m: 1920, spend: '3h', spend_m: 180, left: '2d', left_m: 960 },
    { no:12, id: 'e546763', type:'1111', title: 'National dialed type project adds the responsible person in the task without having to select333333', state:'546763', origin: '3d', origin_m: 1440, spend: '3h', spend_m: 180, left: '2d 5h', left_m: 1260 }
    ], options:{ d2h: 8, w2d: 5 }, options2:{ progress: { percent: 0.8, spend: '1w 1d', total: '2w 2d' }, accuracy: { percent: 0.7, plan: '2w', real: '2d' }, total: { origin: '20d', spend: '2d, 4h', left: '3d', diff: '2w' } } };
    return res.status(200).send(results);
  });

  router.get('/project/:key/report/regressions', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [ { category: '1111', ones: [1,2,3,4,5], gt_ones: [6] }, { category: '2222', ones: [5,2,4,5,23,45,66,53,51,52,59,90,98], gt_ones: [4,6,7] }, { category: '3333', ones: [18,16,17,13,23,24], gt_ones: [7,10] } , { category: '4444', ones: [4,5,6,7], gt_ones: [9,10] } ] };
    return res.status(200).send(results);
  });

  router.get('/project/:key/report/issues', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [ { id: '1111', name: '1111', cnt: 20, y: [{ id: '1111', name: '11111', cnt: 5 }, { id: '2222', name: '22222', cnt: 5 }, { id: '3333', name: '33333', cnt: 1 }, { id: '4444', name: '44444', cnt: 9 } ] }, { id: '2222', name: '2222', cnt: 44, y: [{ id: '1111', name: '11111', cnt: 15 }, { id: '2222', name: '22222', cnt: 0 }, { id: '3333', name: '33333', cnt: 10 }, { id: '4444', name: '44444', cnt: 19 } ] }, { id: '3333', name: '3333', cnt: 32, y: [{ id: '1111', name: '11111', cnt: 15 }, { id: '2222', name: '22222', cnt: 0 }, { id: '3333', name: '33333', cnt: 11 }, { id: '4444', name: '44444', cnt: 6 } ] }, { id: '4444', name: '4444', cnt: 14, y: [{ id: '1111', name: '11111', cnt: 2 }, { id: '2222', name: '22222', cnt: 2 }, { id: '3333', name: '33333', cnt: 1 }, { id: '4444', name: '44444', cnt: 9 } ] } ] };
    return res.status(200).send(results);
  });

  /******************report*****************/

  /******************labels*****************/
  router.get('/project/:key/labels', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results={ ecode: 0, data:[{ id: '1111', name: 'test111', bgColor: '#4a6785', issues:{ completed: 13, incompleted: 12, inestimable: 3 } }, { id: '2222', name: 'test222', bgColor: '#8eb021', issues:{ completed: 15, incompleted: 2, inestimable: 3 } }] };
    return res.status(200).send(results);
  });
  /******************labels*****************/

  /******************labels*****************/
  router.get('/project/:key/reminds', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results={ ecode: 0, data:[{ id: '1111', name: 'test111', status: 'enabled' }, { id: '2222', name: 'test222', status: 'disabled' }] };
    return res.status(200).send(results);
  });

  router.post('/project/:key/reminds', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { name: 'aaaa', description: 'ttttt', status: 'enabled' } };
    return res.status(200).send(results);
  });
  /******************labels*****************/

  /******************integrations*****************/
  router.get('/project/:key/integrations', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [ { user: 'github', pwd: 'aaaa', status: 'disabled' } ] };
    return res.status(200).send(results);
  });

  router.post('/project/:key/integrations', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { user: 'github', pwd: 'aaaa', status: 'enabled' } };
    return res.status(200).send(results);
  });
  /******************integrations*****************/

  /******************integrations*****************/
  router.get('/project/:key/webhooks', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [ { id: '1111', request_url: 'http://aaa.com/aa/bb', events: [ 'create_issue', 'edit_issue', 'del_issue', 'create_version', 'release_version', 'del_version' ], status: 'enabled', ssl: 1 }, { id: '2222', request_url: 'http://bbb.com/aa/bb', events: [ 'create_issue', 'edit_issue', 'del_issue' ], status: 'disabled' } ] };
    return res.status(200).send(results);
  });
  router.post('/project/:key/webhooks', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { id: '1111', request_url: 'http://aaa.com/aa/bb', events: [ 'create_issue', 'edit_issue', 'del_issue', 'create_version', 'release_version', 'del_version' ], status: 'enabled' } };
    return res.status(200).send(results);
  });
  router.put('/project/:key/webhooks/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: { id: '1111', request_url: 'http://aaa.com/aa/bb', events: [ 'create_issue', 'edit_issue', 'del_issue', 'create_version', 'release_version', 'del_version' ], status: 'enabled' } };
    return res.status(200).send(results);
  });
  router.delete('/project/:key/webhooks/:id', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: '1111' };
    return res.status(200).send(results);
  });
  /******************integrations*****************/

  router.get('/project/:key/issue/:id/gitcommits', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [{ id: '1111', committed_at: 1478414469, branch: 'master', sha: '11daffdsaf', message: 'demo-1 test', added: ['aa.php', 'bb.php'], modified:['cc.php', 'dd.php'], removed: ['zz.php'], author:{ id: '111', name: 'Wang Wu', 'email': 'aa@aa.com' }, repo: { name: 'test', homepage: 'http://test.com' }, branch: 'develop', parent: '11111' }, { id: '2222', committed_at: 1488414469, sha: '13daffdsaf', message: 'demo-1 test2', added: ['aa.php', 'bb.php'], removed: ['zz.php'], author:{ id: '111', name: 'Wang Wu', 'email': 'aa@aa.com' }, repo: { name: 'test', homepage: 'http://test.com' }, parent: '11111' }, { id: '3333', committed_at: 1528414469, sha: '12affdsaf', message: 'demo-1 test3', added: ['aa33.php', 'bb33.php'], modified:['cc33.php', 'dd.php'], author:{ id: '111', name: 'Wang Wu', 'email': 'aa@aa.com' }, repo: { name: 'test', homepage: 'http://test.com' }, parent: '11111' }], options:{ current_time: 1520943279 } };
    return res.status(200).send(results);
  });

  /******************calendar****************/
  router.get('/calendar/:year', function(req, res) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 2000);
    const results = { ecode: 0, data: [
      { date: '20190101', year: 2019, month: 1, day: 1, week: 2, lunar: { day: 'First three', text: '' }, type: 'holiday', text: 'New Year' },
      { date: '20190102', year: 2019, month: 1, day: 2, week: 3, lunar: { day: 'First three', text: '' } },
      { date: '20190103', year: 2019, month: 1, day: 3, week: 4, lunar: { day: 'First three', text: '' } },
      { date: '20190104', year: 2019, month: 1, day: 4, week: 5, lunar: { day: 'First three', text: '' } },
      { year: 2019, month: 1, day: 5, week: 6, lunar: { day: 'First three', text: '' } },
      { year: 2019, month: 1, day: 6, week: 7, lunar: { day: 'First three', text: '' } },
      { year: 2019, month: 1, day: 7, week: 1, lunar: { day: 'First three', text: '' } },
      { year: 2019, month: 1, day: 8, week: 2, lunar: { day: 'First three', text: '' } },
      { year: 2019, month: 1, day: 9, week: 3, lunar: { day: 'First three', text: '' } },
      { year: 2019, month: 1, day: 10, week: 4, lunar: { day: 'First three', text: '' } },
      { year: 2019, month: 1, day: 11, week: 5, lunar: { day: 'First three', text: '' } },
      { year: 2019, month: 1, day: 12, week: 6, lunar: { day: 'First three', text: '' } },
      { year: 2019, month: 1, day: 13, week: 7, lunar: { day: 'First three', text: '' } },
      { year: 2019, month: 1, day: 14, week: 1, lunar: { day: 'First three', text: '' } },
      { year: 2019, month: 1, day: 15, week: 2, lunar: { day: 'First three', text: '' } },
      { year: 2019, month: 1, day: 16, week: 3, lunar: { day: 'First three', text: '' } },
      { year: 2019, month: 1, day: 17, week: 4, lunar: { day: 'First three', text: '' } },
      { year: 2019, month: 1, day: 18, week: 5, lunar: { day: 'First three', text: '' } },
      { year: 2019, month: 1, day: 19, week: 6, lunar: { day: 'First three', text: '' }, type: 'workday' },
      { year: 2019, month: 1, day: 20, week: 7, lunar: { day: 'First three', text: '' }, type: 'workday' },
      { year: 2019, month: 1, day: 21, week: 1, lunar: { day: 'First three', text: '' } },
      { year: 2019, month: 1, day: 22, week: 2, lunar: { day: 'First three', text: '' } },
      { year: 2019, month: 1, day: 23, week: 3, lunar: { day: 'First three', text: '' } },
      { year: 2019, month: 1, day: 24, week: 4, lunar: { day: 'First three', text: '' }, text: 'Spring Festival', type: 'holiday' },
      { year: 2019, month: 1, day: 25, week: 5, lunar: { day: 'First three', text: '' }, type: 'holiday' },
      { year: 2019, month: 1, day: 26, week: 6, lunar: { day: 'First three', text: '' }, type: 'holiday' },
      { year: 2019, month: 1, day: 27, week: 7, lunar: { day: 'First three', text: '' }, type: 'holiday' },
      { year: 2019, month: 1, day: 28, week: 1, lunar: { day: 'First three', text: '' }, type: 'holiday' },
      { year: 2019, month: 1, day: 29, week: 2, lunar: { day: 'First three', text: '' }, type: 'holiday' },
      { year: 2019, month: 1, day: 30, week: 3, lunar: { day: 'First three', text: '' }, type: 'holiday' },
      { year: 2019, month: 1, day: 31, week: 4, lunar: { day: 'First three', text: '' } },
      { year: 2019, month: 2, day: 1, week: 5, lunar: { day: 'First four', text: '' }, text: '' },
      { year: 2019, month: 2, day: 2, week: 6, lunar: { day: 'First four', text: '' }, text: '' },
      { year: 2019, month: 2, day: 3, week: 7, lunar: { day: 'First four', text: '' }, text: '' },
      { year: 2019, month: 2, day: 4, week: 1, lunar: { day: 'First four', text: '' }, text: '' },
      { year: 2019, month: 2, day: 5, week: 2, lunar: { day: 'First four', text: '' }, text: '' },
      { year: 2019, month: 2, day: 6, week: 3, lunar: { day: 'First four', text: '' }, text: '' },
      { year: 2019, month: 2, day: 7, week: 4, lunar: { day: 'First four', text: '' }, text: '' },
      { year: 2019, month: 2, day: 8, week: 5, lunar: { day: 'First four', text: '' }, text: '' },
      { year: 2019, month: 2, day: 9, week: 6, lunar: { day: 'First four', text: '' }, text: '' },
      { year: 2019, month: 2, day: 10, week: 7, lunar: { day: 'First four', text: '' }, text: '' },
      { year: 2019, month: 2, day: 11, week: 1, lunar: { day: 'First four', text: '' }, text: '' },
      { year: 2019, month: 2, day: 12, week: 2, lunar: { day: 'First four', text: '' }, text: '' },
      { year: 2019, month: 2, day: 13, week: 3, lunar: { day: 'First four', text: '' }, text: '' },
      { year: 2019, month: 2, day: 14, week: 4, lunar: { day: 'First four', text: '' }, text: '' },
      { year: 2019, month: 2, day: 15, week: 5, lunar: { day: 'First four', text: '' }, text: '' },
      { year: 2019, month: 2, day: 16, week: 6, lunar: { day: 'First four', text: '' }, text: '' },
      { year: 2019, month: 2, day: 17, week: 7, lunar: { day: 'First four', text: '' }, text: '' },
      { year: 2019, month: 2, day: 18, week: 1, lunar: { day: 'First four', text: '' }, text: '' },
      { year: 2019, month: 2, day: 19, week: 2, lunar: { day: 'First four', text: '' }, text: '' },
      { year: 2019, month: 2, day: 20, week: 3, lunar: { day: 'First four', text: '' }, text: '' },
      { year: 2019, month: 2, day: 21, week: 4, lunar: { day: 'First four', text: '' }, text: '' },
      { year: 2019, month: 2, day: 22, week: 5, lunar: { day: 'First four', text: '' }, text: '' },
      { year: 2019, month: 2, day: 23, week: 6, lunar: { day: 'First four', text: '' }, text: '' },
      { year: 2019, month: 2, day: 24, week: 7, lunar: { day: 'First four', text: '' }, text: '' },
      { year: 2019, month: 2, day: 25, week: 1, lunar: { day: 'First four', text: '' }, text: '' },
      { year: 2019, month: 2, day: 26, week: 2, lunar: { day: 'First four', text: '' }, text: '' },
      { year: 2019, month: 2, day: 27, week: 3, lunar: { day: 'First four', text: '' }, text: '' },
      { year: 2019, month: 2, day: 28, week: 4, lunar: { day: 'First four', text: '' }, text: '' },
      { year: 2019, month: 2, day: 29, week: 5, lunar: { day: 'First four', text: '' }, text: '' }
    ], options: { year: 2019, date: '20190103' } };
    return res.status(200).send(results);
  });

}
