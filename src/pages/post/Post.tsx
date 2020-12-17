import axios, { AxiosResponse } from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Card from 'components/card';
import Comment from 'components/comment';
import { PostDTO } from 'dto/PostDTO';
import { UserDTO } from 'dto/UserDTO';
import { CommentDTO } from 'dto/CommentDTO';
import { useDisplayName } from 'hooks/useDisplayName';

interface Params {
    postId: string;
}

interface Props {
    propsMessage: string;
}

const Post: FC<Props> = (props: Props): JSX.Element => {
    const history = useHistory();
    const params = useParams<Params>();
    const [postData, setPostData] = useState<Partial<PostDTO>>({});
    const [userData, setUserData] = useState<Partial<UserDTO>>({});
    const [commentsData, setCommentsData] = useState<Array<CommentDTO>>([]);
    useDisplayName(props.propsMessage, Post.displayName);

    const getPostData = () => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${params.postId}`).then((res: AxiosResponse<PostDTO>) => {
            if (res.status >= 200 && res.status < 300) {
                getUserData(res.data);
            }
        }).catch((error) => {
            throw new Error(error);
        });
    };
    const getUserData = (postData: PostDTO) => {
        axios.get(`https://jsonplaceholder.typicode.com/users/${postData.userId}`).then((res: AxiosResponse<UserDTO>) => {
            if (res.status >= 200 && res.status < 300) {
                setPostData(postData);
                setUserData(res.data);
            }
        }).catch((error) => {
            throw new Error(error);
        });
    };

    const getComments = (postId: string) => {
        axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`).then((res: AxiosResponse<Array<CommentDTO>>) => {
            if (res.status >= 200 && res.status < 300) {
                setCommentsData(res.data);
            }
        }).catch((error) => {
            throw new Error(error);
        });
    };

    useEffect(() => {
        getPostData();
    }, [params.postId]);

    useEffect(() => {
        getComments(params.postId);
    }, [params.postId]); 


    const onBackClick = () => {
        history.push({
            pathname: '/posts'
        });
    };

    let comments;
    if (commentsData && commentsData.length > 0) {
        comments = commentsData.map((comment) => {
            return (
                <Comment key={comment.id} commentData={comment} propsMessage={props.propsMessage}/>
            );
        });
    } else {
        comments = <div>No comments</div>;
    }

    let post;
    if (postData && Object.keys(postData).length > 0) {
        post = <Card
            postData={postData}
            userData={userData}
            propsMessage={props.propsMessage}
        />;
    }

    return (
        <div>
            { postData && Object.keys(postData).length > 0 &&
                <div>
                    <button className="btn btn-primary backButton" onClick={onBackClick}>Back</button>
                    {post}
                    <div>
                        <h5>Comments ({commentsData.length}):</h5>
                        {comments}
                    </div>
                </div>
            }
        </div>
    );
};

Post.displayName= 'Post Component';
export default Post;