import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {AddItemForm} from "../AddItemForm";
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TodoList/Task',
  component: Task,
    args:{
        changeTaskStatus: action('changeTaskStatus'),
        changeTaskTitle: action('changeTaskTitle'),
        removeTask: action('removeTask'),
        todolistId: '1234'
    }
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes

} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskStoriesFalse = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskStoriesFalse.args = {
 task:{id:'jhg', title:'ho storybook', isDone:false}
};

export const TaskStoriesTrue = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskStoriesTrue.args = {
    task:{id:'jhg', title:'ho storybook', isDone:true}
};

