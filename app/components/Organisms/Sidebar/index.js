import React from 'react';
import { useQuery } from '@apollo/client';
import { Skeleton } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import Link from 'next/link';

import { TitleComponent } from '../../Atoms/Titles';
import { ParagraphComponent } from '../../Atoms/Paragraphs';
import Image  from '../../Molecules/Image';
import { GET_SIMILAR } from '../../../graphql/blog';
import Error from '../../../pages/_error';
import {
    SidebarStyle
} from './style';

export const SidebarComponent = ({ className, title, post, category, ...props }) => {
    const q = {
        id_not: post
    };

    if(category.length){
        q.category_some = {
            id_in: category
        }
    }

    const { data, loading, error } = useQuery(GET_SIMILAR(q));

    if(loading) return <Skeleton className="skeleton" active />;
    if(error) return <Error message={error} />;

    const { allNoticias } = data;

    return (
        <SidebarStyle className={className} {...props} >
            <div className="sider--box">

                <TitleComponent className="a-title--light--thin" level={2}>{title}</TitleComponent>
                { allNoticias.map((item)=><ItemsElementSidebar key={_.uniqueId()} obj={item} />) }

            </div>
        </SidebarStyle>
    );

}

const ItemsElementSidebar = ({ obj }) => {

    return (
        <Link href="/blog/[slug]" as={`/blog/${obj.slug}`} key={_.uniqueId()} >
            <a className="item--box--sidebar" href={obj.urlRedirect} >
                <div className="box1">
                    <Image image={obj.imgSrc} />
                </div>
                <div className="box2">
                    <ParagraphComponent className="a-paragraph--yellow custom--bold" boldCustom={500} >
                        {obj.name}
                    </ParagraphComponent>
                    <ParagraphComponent className="a-paragraph--light">
                        {obj.excerpt}
                    </ParagraphComponent>
                    <ParagraphComponent className="a-paragraph--light">
                        {moment(obj.createdAt).format('DD MM, YYYY')}
                    </ParagraphComponent>
                </div>
            </a>
        </Link>
    );

}