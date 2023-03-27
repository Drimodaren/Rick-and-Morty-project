import Button from "./index";

export default { title: "Button", component: Button };
const Template = args => <Button {...args} />;
export const Default = Template.bind({});
Default.args = { children: "Bla bla",color:'green' };
export const UnDefault = Template.bind({});
UnDefault.args = { ...Default.args,children: "Mla mla" };
