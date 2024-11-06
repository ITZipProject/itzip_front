/* eslint-disable */

import * as React from 'react';
import MyResumeHeader from '../resume/mypage/myResumeHeader';
import MyResumeCardView from '../resume/mypage/myResumeCardView';

interface IAdminResumeLayoutProps {}

const AdminResumeLayout: React.FunctionComponent<IAdminResumeLayoutProps> = (props) => {
  return (
    <div className="flex justify-center pt-10 ">
      <div className="w-[60%]">
        <header className=" border-b">
          <MyResumeHeader />
        </header>
        <main>
          <MyResumeCardView />
        </main>
      </div>
    </div>
  );
};

export default AdminResumeLayout;
