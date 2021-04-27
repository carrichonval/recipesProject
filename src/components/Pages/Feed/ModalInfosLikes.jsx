import React from 'react'
import lodash from 'lodash'


const ModalInfosLikes = ({ setShowLikes, likes, users }) => {

    //Récupère l'utilisateur
    const findUser = (user_id) => {
        let find = lodash.find(users, (user) => {
            if (user.id === user_id) {
                return true
            }
        })
        if (find) {
            return find.first_name + ' ' + find.last_name
        } else {
            return ""
        }
    }

    return (
        <div class="fixed z-10 inset-0 overflow-y-auto">
            <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 transition-opacity">
                    <div onClick={() => setShowLikes(false)} class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                <div class="w-2/3 inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:p-6">
                    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
                            <h3 class="text-lg leading-6 font-medium text-gray-900">
                                Personnes ayant likées
                            </h3>
                        </div>
                        <div class="px-4 py-5 sm:p-0">
                            <dl>
                                {likes.map((like, i) => {
                                    if (i === 0) {
                                        return (
                                            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                                                <dt class="text-sm leading-5 font-medium ">
                                                    {findUser(like.user_id)}
                                                </dt>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                                                <dt class="text-sm leading-5 font-medium ">
                                                    {findUser(like.user_id)}
                                                </dt>
                                            </div>
                                        )
                                    }
                                })}
                            </dl>
                        </div>
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                            <button onClick={() => setShowLikes(false)} type="button" className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                                Fermer
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ModalInfosLikes