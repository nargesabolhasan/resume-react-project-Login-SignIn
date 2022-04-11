import {React,memo} from 'react';

const TabsContent = (props) => {
    const{children,tabId,activeTab}=props;
    return (
        <div className={`tabs__content ${
            activeTab == tabId ? "active" : ""
            }`}>
                {children}
        </div>

    );
};

export default memo(TabsContent);