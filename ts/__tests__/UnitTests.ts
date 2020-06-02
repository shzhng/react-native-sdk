import { Iterable, IterableCommerceItem } from '../Iterable'
import { RNIterableAPIMock } from '../__mocks__/jest.setup'
import { IterableInAppMessage, IterableInAppLocation, IterableInAppTrigger, IterableInAppTriggerType, IterableInboxMetadata, IterableInAppCloseSource } from '../IterableInAppClasses'

test("set/get email", () => {
  Iterable.setEmail("user@example.com")
  return Iterable.getEmail().then(email => {
    expect(email).toBe("user@example.com")
  })
})

test("set/get userId", () => {
  Iterable.setUserId("user1")
  return Iterable.getUserId().then(userId => {
    expect(userId).toBe("user1")
  })
})

test("disable device for current user", () => {
  Iterable.disableDeviceForCurrentUser()
  expect(RNIterableAPIMock.disableDeviceForCurrentUser).toBeCalled()
})

test("disable device for all users", () => {
  Iterable.disableDeviceForAllUsers()
  expect(RNIterableAPIMock.disableDeviceForAllUsers).toBeCalled()
})

test("getLastPushPayload", () => {
  RNIterableAPIMock.lastPushPayload = { "var1": "val1", "var2": true }

  return Iterable.getLastPushPayload().then(payload => {
    expect(payload).toEqual({ "var1": "val1", "var2": true })
  })
})

test("trackPushOpenWithCampaignId", () => {
  Iterable.trackPushOpenWithCampaignId(123, 234, "SOMEMESSAEGID", false, {"dataFieldKey":"dataFieldValue"})

  expect(RNIterableAPIMock.trackPushOpenWithCampaignId).toBeCalledWith (
    expect.any(Number),
    expect.any(Number),
    expect.any(String),
    expect.any(Boolean),
    expect.any(Object)
  )
})

test("trackPurchase", () => {

  Iterable.trackPurchase (
    10,
    [new IterableCommerceItem("id1", "Boba Tea", 18, 26)],
    {"dataFieldKey":"dataFieldValue"}
  )

  expect(RNIterableAPIMock.trackPurchase).toBeCalledWith (
    expect.any(Number),
    expect.any(Object),
    expect.any(Object)
  )
})

test("trackInAppOpen", () => {
  let msg: IterableInAppMessage = new IterableInAppMessage("someMessageId", 123, new IterableInAppTrigger(IterableInAppTriggerType.event), new Date(1234), new Date(123123), true, new IterableInboxMetadata("title", "subtitle", "iconURL"), {"CustomPayloadKey":"CustomPayloadValue"}, false);
  Iterable.trackInAppOpen (
    msg,
    IterableInAppLocation.inApp
  )

  expect(RNIterableAPIMock.trackInAppOpen).toBeCalledWith (
    expect.any(String),
    expect.any(Number)
  )
})

test("trackInAppClick", () => {
  let msg: IterableInAppMessage = new IterableInAppMessage("someMessageId", 123, new IterableInAppTrigger(IterableInAppTriggerType.event), new Date(1234), new Date(123123), true, new IterableInboxMetadata("title", "subtitle", "iconURL"), {"CustomPayloadKey":"CustomPayloadValue"}, false);
  Iterable.trackInAppClick (
    msg,
    IterableInAppLocation.inApp,
    "URLClicked"
  )

  expect(RNIterableAPIMock.trackInAppClick).toBeCalledWith (
    expect.any(String),
    expect.any(Number),
    expect.any(String)
  )
})

test("trackInAppClose", () => {
  let msg: IterableInAppMessage = new IterableInAppMessage("someMessageId", 123, new IterableInAppTrigger(IterableInAppTriggerType.event), new Date(1234), new Date(123123), true, new IterableInboxMetadata("title", "subtitle", "iconURL"), {"CustomPayloadKey":"CustomPayloadValue"}, false);
  Iterable.trackInAppClose (
    msg,
    IterableInAppLocation.inbox,
    IterableInAppCloseSource.link,
    "ClickedURL"
  )

  expect(RNIterableAPIMock.trackInAppClose).toBeCalledWith (
    expect.any(String),
    expect.any(Number),
    expect.any(Number),
    expect.any(String)
  )
})

test("trackEvent", () => {
  let msg: IterableInAppMessage = new IterableInAppMessage("someMessageId", 123, new IterableInAppTrigger(IterableInAppTriggerType.event), new Date(1234), new Date(123123), true, new IterableInboxMetadata("title", "subtitle", "iconURL"), {"CustomPayloadKey":"CustomPayloadValue"}, false);
  Iterable.trackEvent (
    "EventName",
    {"DatafieldKey":"DatafieldValue"}
  )

  expect(RNIterableAPIMock.trackEvent).toBeCalledWith (
    expect.any(String),
    expect.any(Object)
  )
})

