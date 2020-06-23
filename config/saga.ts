import { SagaIterator } from 'redux-saga';
import { all } from 'redux-saga/effects';
import userSagas from '../modules/user/sagas'

export default function*(): SagaIterator {
    yield all([...userSagas]);
}
