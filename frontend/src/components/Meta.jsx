import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"/>
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'MangoHub',
  description: 'We sell the best products for cheap',
  keywords: 'mango, buy alphonso mango,ratnagiri mango, devgad mango',
};

export default Meta;
