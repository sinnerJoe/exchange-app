
import { renderHook, act } from "@testing-library/react-hooks";
import { useExchange } from "./exchange-hooks";

jest.mock("store/selectors", () => ( {
  useConversionRate: jest.fn()
} ));

import { useConversionRate } from "store/selectors";


describe("exchange page ", () => {
  it("should derive destination", async () => {
    (useConversionRate as any).mockReturnValue({loading: false, value: 2})
    const handle = renderHook(() => useExchange ('USD', 'GBP'));
    
    await act(async () => {
      handle.result.current.changeSource(400)
      await handle.waitForNextUpdate()
      expect(handle.result.current.sourceAmount).toEqual(400);
      expect(handle.result.current.destinationAmount).toEqual(800);
    })
  });
  it("should derive source", async () => {
    (useConversionRate as any).mockReturnValue({loading: false, value: 2})
    const handle = renderHook(() => useExchange ('USD', 'GBP'));
    
    await act(async () => {
      handle.result.current.changeDestination(400)
      await handle.waitForNextUpdate()
      expect(handle.result.current.destinationAmount).toEqual(400);
      expect(handle.result.current.sourceAmount).toEqual(200);
    })
  });
  it("should report correct exchange rate", async () => {
    (useConversionRate as any).mockReturnValue({loading: false, value: 2})
    const handle = renderHook(() => useExchange ('USD', 'GBP'));
    
    await act(async () => {
      expect(handle.result.current.loading).toEqual(false);
      expect(handle.result.current.exchangeRate).toEqual(2);
    })
  });
});
