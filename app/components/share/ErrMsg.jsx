import _ from 'lodash';

const Err = {};

Err.enumItems = [
   // session error code
  { code: -10000, msg: 'Login failed.' },
  { code: -10001, msg: 'Session expiration.' },
  { code: -10002, msg: 'Insufficient permissions.' },
  { code: -10003, msg: 'The mailbox or password cannot be empty.' },

  // issue
  { code: -11100, msg: 'The problem cannot be empty.' },
  { code: -11101, msg: 'Schemadoes not exist.' },
  { code: -11102, msg: 'Time tracking field format is incorrect.' },
  { code: -11103, msg: 'The problem does not exist or does not belong to this project.' },
  { code: -11104, msg: 'The designated person in charge cannot be empty.' },
  { code: -11105, msg: 'The filter name cannot be empty.' },
  { code: -11106, msg: 'The filter name cannot be repeated.' },
  { code: -11107, msg: 'Filters do not exist or do not belong to this project.' },
  { code: -11108, msg: 'The subject cannot be empty.' },
  { code: -11109, msg: 'Copy objects must be specified.' },
  { code: -11110, msg: 'The parent problem object does not exist or does not belong to this item.' },
  { code: -11111, msg: 'The parent problem object must be specified.' },

  { code: -11121, msg: 'The chain problem must be specified.' },
  { code: -11122, msg: 'The link problem must be specified.' },
  { code: -11123, msg: 'The link relationship is specified incorrect.' },
  { code: -11124, msg: 'The link relationship already exists.' },
  { code: -11125, msg: 'This link does not exist.' },

  // comments error code
  { code: -11200, msg: 'The comments cannot be empty.' },
  { code: -11201, msg: 'Comments do not exist or do not belong to this project.' },
  { code: -11202, msg: 'ReplyIDCan not be empty.' },
  { code: -11203, msg: 'This response does not exist.' },
  { code: -11204, msg: 'The operation is incorrect.' },
  
  // worklog error code
  { code: -11300, msg: 'It is time to take time.' },
  { code: -11301, msg: 'The time-consuming time format is incorrect.' },
  { code: -11302, msg: 'The start time cannot be empty.' },
  { code: -11303, msg: 'The remaining time adjustment method is incorrect.' },
  { code: -11304, msg: 'The remaining time must be specified.' },
  { code: -11305, msg: 'The remaining time specifies that the format is incorrect.' },
  { code: -11306, msg: 'Reduction time must be developed.' },
  { code: -11307, msg: 'The reduction time format is incorrect.' },
  { code: -11308, msg: 'The problem does not exist.' },
  { code: -11309, msg: 'Work logs do not exist or do not belong to this issue.' },
  
  // module error code
  { code: -11400, msg: 'The module name cannot be empty.' },
  { code: -11401, msg: 'The module name cannot be repeated.' },
  { code: -11402, msg: 'The module does not exist or does not belong to this item.' },
  { code: -11403, msg: 'The module is used in the problem.' },
  
  // version error code
  { code: -11500, msg: 'The version name cannot be empty.' },
  { code: -11501, msg: 'The version name cannot be repeated.' },
  { code: -11502, msg: 'The version start time must be less than the end time.' },
  { code: -11503, msg: 'The version does not exist or does not belong to this item.' },
  { code: -11504, msg: 'The version is used in the problem.' },

  // type error code
  { code: -12000, msg: 'The type name cannot be empty.' },
  { code: -12001, msg: 'Type names cannot be repeated.' },
  { code: -12002, msg: 'Type zoom cannot be empty.' },
  { code: -12003, msg: 'Type reduction cannot be repeated.' },
  { code: -12004, msg: 'The type of associated interface cannot be empty.' },
  { code: -12005, msg: 'Types related workflow cannot be empty.' },
  { code: -12006, msg: 'Types do not exist or do not belong to this project.' },
  { code: -12007, msg: 'Types are used in the problem.' },

  // workflow error code
  { code: -12100, msg: 'Workflow names cannot be empty.' },
  { code: -12101, msg: 'Workflow does not exist or does not belong to this project.' },
  { code: -12102, msg: 'This workflow has been bound to a problem type.' },

  // field error code
  { code: -12200, msg: 'Field names cannot be empty.' },
  { code: -12201, msg: 'Field key values cannot be empty.' },
  { code: -12202, msg: 'This key value has been occupied by the system.' },
  { code: -12203, msg: 'The key value cannot be repeated.' },
  { code: -12204, msg: 'Field types cannot be empty.' },
  { code: -12205, msg: 'The field type value is incorrect.' },
  { code: -12206, msg: 'Fields do not exist or do not belong to this item.' },
  { code: -12207, msg: 'This field is used in the interface.' },

  // screen error code
  { code: -12300, msg: 'The interface name cannot be empty.' },
  { code: -12301, msg: 'The interface does not exist or does not belong to this item.' },
  { code: -12302, msg: 'This interface has been bound to a problem type.' },
  { code: -12303, msg: 'This interface is used in the process.' },

  // state error code
  { code: -12400, msg: 'The status name cannot be empty.' },
  { code: -12401, msg: 'The status name cannot be repeated.' },
  { code: -12402, msg: 'State does not exist or do not belong to this project.' },
  { code: -12403, msg: 'The status is used in the problem.' },
  { code: -12404, msg: 'The state is used in the workflow.' },

  // resolution error code
  { code: -12500, msg: 'The result name cannot be empty.' },
  { code: -12501, msg: 'The result name cannot be repeated.' },
  { code: -12502, msg: 'The results do not exist or do not belong to this item.' },
  { code: -12503, msg: 'The result is used in the problem.' },

  // priority error code
  { code: -12600, msg: 'The priority name cannot be empty.' },
  { code: -12601, msg: 'The priority name cannot be repeated.' },
  { code: -12602, msg: 'The priority does not exist or does not belong to this item.' },
  { code: -12603, msg: 'The priority is used in the problem.' },

  // role error code
  { code: -12700, msg: 'The character name cannot be empty.' },
  { code: -12701, msg: 'The permissions item value is incorrect.' },
  { code: -12702, msg: 'The role does not exist or does not belong to this project.' },
  { code: -12703, msg: 'The role is used in the project.' },

  // event error code
  { code: -12800, msg: 'The event name cannot be empty.' },
  { code: -12801, msg: 'The event name cannot be repeated.' },
  { code: -12802, msg: 'The event does not exist or does not belong to this item.' },

  // project error code
  { code: -14000, msg: 'The project name cannot be empty.' },
  { code: -14001, msg: 'The item key value cannot be empty.' },
  { code: -14002, msg: 'The item key value has been occupied.' },
  { code: -14003, msg: 'The designated person in charge does not exist.' },
  { code: -14004, msg: 'The project does not exist.' },
  { code: -14005, msg: 'The person in charge must be specified.' },
  { code: -14006, msg: 'The project does not exist.' },
  { code: -14007, msg: 'No objects are selected.' },
  { code: -14008, msg: 'There is no specified state.' },
  { code: -14009, msg: 'The project is closed.' },

  // mysetting error code
  { code: -15000, msg: 'User does not exist.' },
  { code: -15001, msg: 'The original password cannot be empty.' },
  { code: -15002, msg: 'The original password is incorrect.' },
  { code: -15003, msg: 'The new password cannot be empty.' },
  { code: -15004, msg: 'Password reset failed.' },
  { code: -15005, msg: 'The user\'s name cannot be empty.' },

  // file error code
  { code: -15100, msg: 'file does not exist.' },
  { code: -15101, msg: 'File upload failed.' },
  { code: -15102, msg: 'File deletion failed.' }
];

Err.getErrMsg = function (code) {
  const ind = _.findIndex(Err.enumItems, { code: code });
  if (ind !== -1) {
    return Err.enumItems[ind].msg;
  } else {
    return '';
  }
};

export default Err;
