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
  title: 'Welcome To Slayy.By.Shea',
  description: 'uniquely handmade for you',
  keywords: 'handmade, buy handmade, cheap handmade, handmade gifts, handmade jewelry, jewelry, buy jewelry, cheap jewelry',
};

export default Meta;
