import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Task } from '../Task';
import {action} from "@storybook/addon-actions";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/Task',
    component: Task,
    args:{
        changeTaskStatus: action('changeTaskStatus'),
        changeTaskTitle: action('changeTaskTitle'),
        removeTask: action('removeTask'),
        todolistId: '12'
    }

    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskStoryisDone = Template.bind({});
TaskStoryisDone.args = {
    task: {id:'2134', title:'hi storybook', isDone: true}
}

export const TaskStoryNotisDone = Template.bind({});
TaskStoryNotisDone.args = {
    task: {id:'2134', title:'hi storybook', isDone: false}
}

// More on args: https://storybook.js.org/docs/react/writing-stories/args

