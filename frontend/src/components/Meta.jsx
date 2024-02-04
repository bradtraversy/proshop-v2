import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome To Sanaa Art Shop',
  description: 'Connecting the artists and community through the products',
  keywords: 'sanaa, art, shop, music, bags, events',
};

export default Meta;
