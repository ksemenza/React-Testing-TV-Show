import React from 'react'
import {render} from '@testing-library/react'
import App from './App'
import '@testing-library/jest-dom/extend-expect';
import {fetchShow as mockFetchMission} from './api/fetchShow'

jest.mock( './api/fetchShow')