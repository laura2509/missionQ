import React, { FC, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useHistory } from 'react-router-dom';
import Card from 'components/card';
import { PostDTO } from 'dto/PostDTO';
import { UserDTO } from 'dto/UserDTO';
import { CommentDTO } from 'dto/CommentDTO';
import { useDisplayName } from 'hooks/useDisplayName';

interface Props {
    propsMessage: string;
}

const Posts: FC<Props> = (props: Props): JSX.Element => {
    const [postsData, setPostsData] = useState<Array<PostDTO>>([]);
    const [filteredPostsData, setFilteredPostsData] = useState<Array<PostDTO>>([]);
    const [usersData, setUsersData] = useState<Array<UserDTO>>([]);
    const [commentsData, setCommentsData] = useState<Array<CommentDTO>>([]);
    const [searchString, setSearchString] = useState('');
    useDisplayName(props.propsMessage, Posts.displayName);
    const history = useHistory();

    const getPostsData = () => {
        axios.get('https://jsonplaceholder.typicode.com/posts').then((res: AxiosResponse<Array<PostDTO>>) => {
            if (res.status >= 200 && res.status < 300) {
                setPostsData(res.data);
            }
        }).catch((error) => {
            throw new Error(error);
        });
    };

    const getUsersData = () => {
        axios.get(`https://jsonplaceholder.typicode.com/users`).then((res: AxiosResponse<Array<UserDTO>>) => {
            if (res.status >= 200 && res.status < 300) {
                setUsersData(res.data);
            }
        }).catch((error) => {
            throw new Error(error);
        });
    };

    const getCommentsData = () => {
        axios.get(`https://jsonplaceholder.typicode.com/comments`).then((res: AxiosResponse<Array<CommentDTO>>) => {
            if (res.status >= 200 && res.status < 300) {
                setCommentsData(res.data);
            }
        }).catch((error) => {
            throw new Error(error);
        });
    };

    useEffect(() => {
        getPostsData();
        getUsersData();
        getCommentsData();
    }, []);

    useEffect(() => {

        if (postsData && postsData.length > 0) {
            const data: Array<PostDTO> = JSON.parse(JSON.stringify(postsData));

            // map users data with posts data
            data.map((post) => {
                const findUserData = usersData.find(({ id }) => id === post.userId);

                if (findUserData) {
                    post.user = findUserData;
                }
                return post;
            });

            const filteredData = data.filter((item) => {
                if (item.user) {
                    return item.user?.name?.toLowerCase().includes(searchString.toLowerCase());
                } else return item;

            });
            setFilteredPostsData(filteredData);
        }

    }, [searchString, postsData, usersData]);

    const onSearch = (event: any) => {
        setSearchString(event.target.value);
    };

    const onPostClick = (id: number | undefined) => {
        if (id) {
            history.push({
                pathname: `posts/${id}`
            });
        }
    };


    let posts;
    if (filteredPostsData && filteredPostsData.length > 0) {
        posts = filteredPostsData.map((post: PostDTO) => {

            // count comments per post
            let numberOfComments = 0;
            if (commentsData && commentsData.length > 0) {
                commentsData.map((comment) => {
                    if (comment.postId === post.id) {
                        numberOfComments++;
                    }
                });
            }

            return (
                <div key={post.id}>
                    <Card
                        postData={post}
                        userData={post.user}
                        commentsNumber={numberOfComments}
                        openPostButton={true}
                        onPostClick={onPostClick}
                        propsMessage={props.propsMessage}
                    />
                </div>
            );
        });
    }


    return (
        <div>
            <h4>Posts</h4>
            <input style={{width: '20%'}} className="form-control mr-sm-2" type="text" placeholder="Search by name"
                value={searchString}
                onChange={onSearch}
            />
            {posts}
        </div >
    );

};

Posts.displayName = 'Posts Component';
export default Posts;