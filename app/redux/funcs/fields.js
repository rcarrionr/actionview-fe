// Utils for removing boilerplate from Redux
import _ from 'lodash';

export function arrange(options) {
  const fields = [
    { key: 'type', name: 'type', type: 'Select' },
    { key: 'priority', name: 'priority', type: 'Select' },
    { key: 'state', name: 'state', type: 'Select' },
    { key: 'resolution', name: 'Solution', type: 'Select' },
    { key: 'module', name: 'Module', type: 'MultiSelect' },
    { key: 'resolve_version', name: 'Solution', type: 'SingleVersion' },
    { key: 'effect_versions', name: 'Impact version', type: 'MultiVersion' },
    { key: 'labels', name: 'Label', type: 'MultiSelect' },
    { key: 'reporter', name: 'Reporter', type: 'SingleUser' },
    { key: 'assignee', name: 'principal', type: 'SingleUser' },
    { key: 'resolver', name: 'Solve', type: 'SingleUser' },
    { key: 'closer', name: 'Shuttle', type: 'SingleUser' },
    { key: 'created_at', name: 'Create time', type: 'DateTimePicker' },
    { key: 'updated_at', name: 'Update time', type: 'DateTimePicker' },
    { key: 'resolved_at', name: 'Resolution time', type: 'DateTimePicker' },
    { key: 'closed_at', name: 'Closing time', type: 'DateTimePicker' },
    { key: 'epic', name: 'Epic', type: 'Select' },
    { key: 'sprints', name: 'Sprint', type: 'MultiSelect' }
  ];

  _.forEach(options.fields || [], (v) => {
    const index = _.findIndex(fields, { key: v.key });
    if (index === -1) {
      fields.push(v);
    }
  });

  _.forEach(fields, (v) => {
    if (v.key == 'type') {
      v.optionValues = options.types || [];
    } else if (v.key == 'priority') {
      v.optionValues = options.priorities || [];
    } else if (v.key == 'state') {
      v.optionValues = options.states || []
    } else if (v.key == 'resolution') {
      v.optionValues = options.resolutions || []
    } else if (v.key == 'module') {
      v.optionValues = options.modules || []
    } else if (v.key == 'labels') {
      v.optionValues = options.labels || []
    } else if (v.key == 'epic') {
      v.optionValues = options.epics || []
    } else if (v.key == 'sprints') {
      v.optionValues = options.sprints || []
    } else if (v.type == 'SingleVersion' || v.type == 'MultiVersion') {
      v.optionValues = options.versions || []
    } else if (v.type == 'SingleUser' || v.type == 'MultiUser') {
      v.optionValues = options.users || []
    }
  });

  return fields;
}
