import { useEffect, useReducer, useState } from 'react'
import { Card, Grid } from 'react-mui'
import Quest from './Quest.js'
import * as Api from "../../../api"
import questAddForm from './questAddForm.js'
import Style from '../../../App.module.css'
import { questReducer } from '../../../reducer'

const quests = ({ isLogin, user }) => {

    const [quests, questDispatch] = useReducer(questReducer, [])

    //TODO: API get 요청해서 set하기!
    useEffect(() => {
        const getData = async () => {
            try {
                await Api.get(`questboard`)
                    .then((res) => {
                        questDispatch({
                            type: 'SET',
                            payload: res.data.quest
                        })
                        console.log('질문게시판 목록을 불러왔어요.')
                    })
            } catch (error) {
                alert(error.response.data)
            }
        }
        getData()
    }

    //* QuestDetail 컴포넌트로 선택된 게시글을 가져가는 상태값
    const [selectedQuest, setSelectedQuest] = useState(null)

    const [isAdding, setIsAdding] = useState(false)

    //* 게시글 상세 페이지로 이동하는 상태값, true: 상세페이지, false: 게시글 목록
    const [isDetail, setIsDetail] = useState(false)

    useEffect(() => {
        setIsDetail(false)
    }
    return (
        <Card className={['mt-4', 'mb-4'].join(' ')}>
            <div class={Style.questItem}>
                <Card.Title style={{ fontWeight: 'bolder' }}>질문게시판</Card.Title>
            </div>

            {isDetail ? (
                <questDetail
                    setIsDetail={setIsDetail}
                    selectedQuest={selectedQuest}
                    isLogin={isLogin}
                    writer={writer} />
            ) : (
                <Card.Body style={{ backgroundColor: "#F6F7FF" }}>
                    {/*로그인했을 때만 글작성할 수 있음 */}
                    {isLogin && (
                        <Grid className="text-center">
                            <Grid className="mb-4">
                                <button
                                    onClick={() => setIsAdding(true)}
                                    className={[Style.formAddButton, Style.questAddButton].join(' ')}>
                                </button>
                            </Grid>
                        </Grid>
                    )}

                    {isAdding && (
                        <questAddForm
                            writer={writer}
                            quests={quests}
                            dispatch={questDispatch}
                            setIsAdding={setIsAdding} />
                    )}

                    {quests.map((quest) => (
                        <quest
                            key={quest.id}
                            quest={quest}
                            dispatch={questDispatch}
                            writer={wirter}
                            isLogin={isLogin}
                            setIsDetail={setIsDetail}
                            setSelectedQuest={setSelectedQuest}
                        />
                    ))}
                </Card.Body>
            )}
        </Card>
        
    )
}
export default questboardlist