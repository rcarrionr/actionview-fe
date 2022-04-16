
export const FieldTypes =  [
  { value: 'Integer', label: 'Integer field' },
  { value: 'Number', label: 'Numerical field' },
  { value: 'Text', label: 'Text box' },
  { value: 'TextArea', label: 'Text box' },
  { value: 'RichTextEditor', label: 'Welfare text' },
  { value: 'Select', label: 'Select a list(Untrue)' },
  { value: 'MultiSelect', label: 'Select a list(Multi-line)' },
  { value: 'CheckboxGroup', label: 'Check button' },
  { value: 'RadioGroup', label: 'single button' },
  { value: 'DatePicker', label: 'Date Select Control' },
  { value: 'DateTimePicker', label: 'Date Time Select Control' },
  { value: 'TimeTracking', label: 'Time tracking' },
  { value: 'File', label: 'document' },
  { value: 'SingleVersion', label: 'Single version selection' },
  { value: 'MultiVersion', label: 'Multi-version selection' },
  { value: 'SingleUser', label: 'Single user choice' },
  { value: 'MultiUser', label: 'Multi-user choice' },
  { value: 'Url', label: 'URL' }
];

export const StateCategories = [
  { id: 'new', name: 'New construction' },
  { id: 'inprogress', name: 'in progress' },
  { id: 'completed', name: 'Finish' }
];

export const Permissions = {
  project: [
    { id: 'view_project', name: 'View project' },
    { id: 'manage_project', name: 'Management project' }
  ],
  issue: [
    { id: 'create_issue', name: 'Create a problem' },
    { id: 'edit_issue', name: 'Editing problem' },
    { id: 'edit_self_issue', name: 'Edit your own creation' },
    { id: 'delete_issue', name: 'Delete problem' },
    { id: 'delete_self_issue', name: 'Delete questions created yourself' },
    { id: 'assign_issue', name: 'Allocation problem' },
    { id: 'assigned_issue', name: 'Distributed problem' },
    { id: 'resolve_issue', name: 'Solve the problem' },
    { id: 'close_issue', name: 'Turn question' },
    { id: 'reset_issue', name: 'Reset problem' },
    { id: 'link_issue', name: 'Link problem' },
    { id: 'move_issue', name: 'Mobile problem' },
    { id: 'exec_workflow', name: 'Implementation process' }
  ],
  comments: [
    { id: 'add_comments', name: 'add comment' },
    { id: 'edit_comments', name: 'Editor\'s comment' },
    { id: 'edit_self_comments', name: 'Edit your comment' },
    { id: 'delete_comments', name: 'Delete comment' },
    { id: 'delete_self_comments', name: 'Delete your own comments' }
  ],
  worklogs: [
    { id: 'add_worklog', name: 'Add a work log' },
    { id: 'edit_worklog', name: 'Edit work log' },
    { id: 'edit_self_worklog', name: 'Edit your work log' },
    { id: 'delete_worklog', name: 'Delete work log' },
    { id: 'delete_self_worklog', name: 'Delete your work log' }
  ],
  files: [
    { id: 'upload_file', name: 'Upload Attachment' },
    { id: 'download_file', name: 'Download attachments' },
    { id: 'remove_file', name: 'Delete attachment' },
    { id: 'remove_self_file', name: 'Delete yourself upload accessories' }
  ]
};

export const webhookEvents = [
  { id: 'create_issue', name: 'Create a problem' },
  { id: 'edit_issue', name: 'Editing problem' },
  { id: 'del_issue', name: 'Delete problem' },
  { id: 'resolve_issue', name: 'Solve the problem' },
  { id: 'close_issue', name: 'Turn question' },
  { id: 'reopen_issue', name: 'Reopeous' },
  { id: 'create_version', name: 'Create version' },
  { id: 'edit_version', name: 'Editing version' },
  { id: 'release_version', name: 'release version' },
  { id: 'merge_version', name: 'Consolidated version' },
  { id: 'del_version', name: 'Delete version' },
  { id: 'add_worklog', name: 'Add a work log' },
  { id: 'edit_worklog', name: 'Edit work log' }
];

export const CardTypes = {
  CARD: 'card',
  KANBAN_COLUMN: 'kanban_column',
  KANBAN_FILTER: 'kanban_filter'
};

export const PriorityRGBs = [
  '#CCCCCC',
  '#B3B3B3',
  '#999999',
  '#A4DD00',
  '#68BC00',
  '#006600',
  '#73D8FF',
  '#009CE0',
  '#0062B1',
  '#FCDC00',
  '#FCC400',
  '#FB9E00',
  '#FE9200',
  '#E27300',
  '#C45100',
  '#F44E3B',
  '#D33115',
  '#9F0500'
];

export const LabelRGBs = [
  '#CCCCCC',
  '#B3B3B3',
  '#999999',
  '#808080',
  '#666666',
  '#FDA1FF',
  '#FA28FF',
  '#AB149E',
  '#AEA1FF',
  '#7B64FF',
  '#653294',
  '#73D8FF',
  '#009CE0',
  '#0062B1',
  '#68CCCA',
  '#16A5A5',
  '#0C797D',
  '#A4DD00',
  '#68BC00',
  '#006600',
  '#DBDF00',
  '#B0BC00',
  '#808900',
  '#FCDC00',
  '#FCC400',
  '#FB9E00',
  '#FE9200',
  '#E27300',
  '#C45100',
  '#F44E3B',
  '#D33115',
  '#9F0500',
  '#4D4D4D',
  '#333333',
  '#000000'
];

export const DetailMinWidth = 600;
export const DetailMaxWdith = 1000;
