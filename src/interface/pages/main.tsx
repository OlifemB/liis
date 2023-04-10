import React from 'react';
import Container from "@/interface/ui/container";
import AsideFilters from "@/interface/modules/aside-filters";
import AsideFavorites from "@/interface/modules/aside-favorites";
import MainContent from "@/interface/modules/main-content";
import {useActionCreators, useAppSelector} from "@/libs/hooks";
import {selectIsAuth} from "@/store/user";
import {Navigate} from "react-router-dom";
import Header from "@/interface/modules/header";
import dayjs from "dayjs";
import ru_dayjs from 'dayjs/locale/ru'

dayjs.locale(ru_dayjs)

const Main: React.FC = () => {
    const isAuth = useAppSelector(selectIsAuth)
    
    return (
        <>
            {!isAuth &&  <Navigate to={'/login'}/>}
            
            <Header/>
            
            <section>
                <Container>
                    <div className={'flex flex-row gap-6'}>
                        <aside className={'flex flex-col items-start gap-6'} style={{width: '360px'}}>
                            <AsideFilters/>
                            <AsideFavorites/>
                        </aside>
                        
                        <main style={{width: '664px'}}>
                            <MainContent/>
                        </main>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default Main;