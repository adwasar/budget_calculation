import { getSnapshot } from 'mobx-state-tree';

import LoginMessage from '../components/LoginMessage';
import { isLogin } from '../storage';

function PageDeveloper() {
  return (
    <>
      <div className="container">
        {getSnapshot(isLogin).state ? (
          <>
            <div className="s-60"></div>
            <div className="mt-5 mt-md-0">
              <h2>Front-End React Developer</h2>
              <div>
                My name is Vlad, and I have been studying Front-End development for more 1.5 years
                (courses, self-learning, pet projects, internship).
                <br />
                I'm currently doing an unpaid internship and feel ready for real projects.
              </div>
              <div className="s-40"></div>
              <h2>Tech Stack</h2>
              <ul>
                <li>JavaScript, TypeScript</li>
                <li>HTML 5, CSS</li>
                <li>SCSS, Bootstrap</li>
                <li>Mobx-State-Tree</li>
                <li>Figma (Software)</li>
              </ul>
              <div className="s-40"></div>
              <h2>Portfolio</h2>
              <a className="text-decoration-underline" href="https://adwasar.github.io/portfolio/">
                https://adwasar.github.io/portfolio/
              </a>
            </div>
          </>
        ) : (
          <LoginMessage />
        )}
      </div>
    </>
  );
}

export default PageDeveloper;
