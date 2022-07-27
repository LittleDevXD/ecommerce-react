import { useNavigate } from 'react-router';

import { DirectoryContainer, BackgroundImage, Body} from './directory.styles.jsx';

const Directory = ({category}) => {
  const { title, imageUrl, routeName } = category;

  const navigate = useNavigate();

  const navigateHandler = () => navigate(routeName);

  return (
    <DirectoryContainer onClick={navigateHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryContainer>
  )
}

export default Directory;