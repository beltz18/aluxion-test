const bcrypt = require('bcrypt')
const User   = require('../../schema/user.js')
const {
  regUser,
  getUser,
  logUser
} = require('../user.controller.js')

jest.mock('../../schema/user.js', () => ({
  findOne: jest.fn(),
  save: jest.fn()
}))

describe('regUser', () => {
  it('should return success message when registering a new user', async () => {
    User.save.mockResolvedValue(true)

    const result = await regUser('John Doe', 'john@example.com', 'password')

    expect(result).toEqual({ 'message': 'user created', 'status': true })
    expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' })
    expect(User.save).toHaveBeenCalled()
  })

  it('should return error message when email is already taken', async () => {
    User.findOne.mockResolvedValue({ name: 'Existing User' })

    const result = await regUser('John Doe', 'john@example.com', 'password')

    expect(result).toEqual({ 'message': 'Email already taken', 'status': false })
    expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' })
    expect(User.save).not.toHaveBeenCalled()
  })

  it('should return error message when there is an error inserting the user', async () => {
    User.findOne.mockResolvedValue(null)
    User.save.mockResolvedValue(false)

    const result = await regUser('John Doe', 'john@example.com', 'password')

    expect(result).toEqual({ 'message': 'Error trying to insert user', 'status': false })
    expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' })
    expect(User.save).toHaveBeenCalled()
  })
})

describe('getUser', () => {
  it('should return the user object when a user with the given email exists', async () => {
    const mockUser = { name: 'John Doe', email: 'john@example.com' }
    User.findOne.mockResolvedValue(mockUser)

    const result = await getUser('john@example.com')

    expect(result).toEqual(mockUser)
    expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' })
  })

  it('should return null when a user with the given email does not exist', async () => {
    User.findOne.mockResolvedValue(null)

    const result = await getUser('john@example.com')

    expect(result).toBeNull()
    expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' })
  })
})

describe('logUser', () => {
  it('should return success message and user data when email and password are correct', async () => {
    const mockUser = { name: 'John Doe', email: 'john@example.com', password: 'hashedPassword' }
    User.findOne.mockResolvedValue(mockUser)
    bcrypt.compare.mockResolvedValue(true)

    const result = await logUser('john@example.com', 'password')

    expect(result).toEqual({ 'message': 'User authenticated', 'status': true, 'data': { ...mockUser, password: undefined } })
    expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' })
    expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashedPassword')
  })

  it('should return error message when password is incorrect', async () => {
    const mockUser = { name: 'John Doe', email: 'john@example.com', password: 'hashedPassword' }
    User.findOne.mockResolvedValue(mockUser)
    bcrypt.compare.mockResolvedValue(false)

    const result = await logUser('john@example.com', 'wrongPassword')

    expect(result).toEqual({ 'message': 'Incorrect password', 'status': false })
    expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' })
    expect(bcrypt.compare).toHaveBeenCalledWith('wrongPassword', 'hashedPassword')
  })

  it('should return error message when user with the given email does not exist', async () => {
    User.findOne.mockResolvedValue(null)

    const result = await logUser('john@example.com', 'password')

    expect(result).toEqual({ 'message': 'This user doesnt exists', 'status': false })
    expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' })
    expect(bcrypt.compare).not.toHaveBeenCalled()
  })
})