import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Task } from '../Task';
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../EditableSpan";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    args:{
       value: "hi storybook",
        onChange: action('onChange')
    }

    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof EditableSpan>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStoties = Template.bind({});
EditableSpanStoties.args = {

}



// More on args: https://storybook.js.org/docs/react/writing-stories/args

