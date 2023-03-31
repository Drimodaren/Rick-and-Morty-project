import Card from "./index";


export default { title: "Card", component: Card };
const Template = args => <Card {...args} />;
export const Default = Template.bind({});
Default.args = { title: "Rick", description: "Human" };
export const CardWithOutImage = Template.bind({});
CardWithOutImage.args = { ...Default.args };
export const CardWithOutImageAndWithInfo = Template.bind({});
CardWithOutImageAndWithInfo.args = { ...Default.args, info: "Bastard" };
export const CardWithImage = Template.bind({});
CardWithImage.args = { ...Default.args, image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg" };
