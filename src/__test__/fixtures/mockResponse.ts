const mockResponse = () => {
  const res: any = {}
  res.json = jest.fn().mockReturnValue(res)
  res.status = jest.fn(() => res)
  return res
}

export default mockResponse
