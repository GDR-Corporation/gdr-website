/* ============================================================================
 *  GDR SWAP — FEE CONFIG (edit only this block)
 * ----------------------------------------------------------------------------
 *  Jupiter Plugin takes fees via formProps.referralAccount + formProps.referralFee
 *  (https://developers.jup.ag/docs/tool-kits/plugin/customization#form-props-configuration).
 *
 *  REFERRAL_ACCOUNT must be a Jupiter *Referral Program account* (a PDA created
 *  under the Jupiter Ultra Referral Project DkiqsTrw1u1bYFumumC7sCG2S8K25qc2vemJFHyW2wJc),
 *  NOT a plain wallet address. Create it at https://referral.jup.ag/ by connecting
 *  FEE_OWNER_WALLET, then create referral token accounts (at least SOL + USDC).
 *  See README "Enabling the swap fee" and
 *  https://developers.jup.ag/docs/swap/order-and-execute#referral-fees
 *
 *  FEE_BPS: 50–255 bps allowed (50 = 0.5%). Jupiter keeps 20% of the fee.
 *  If REFERRAL_ACCOUNT is "" the widget runs with NO GDR fee.
 * ========================================================================== */
const FEE_OWNER_WALLET = "Cge5Wt3hULoFKCLpH73tpEV6MkV3tvBRrkC2eYP1gZyx"; // Quinn's wallet (owner/partner of the referral account). Informational only — NOT passed to Jupiter.
const REFERRAL_ACCOUNT = ""; // <-- paste the referralAccount pubkey from referral.jup.ag here
const FEE_BPS = 50;
/* ======================== end of fee config ============================== */

(function () {
  const formProps = {
    initialInputMint: "So11111111111111111111111111111111111111112", // SOL
    initialOutputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
  };
  if (REFERRAL_ACCOUNT && FEE_BPS >= 50 && FEE_BPS <= 255) {
    formProps.referralAccount = REFERRAL_ACCOUNT;
    formProps.referralFee = FEE_BPS;
  }
  function start() {
    if (!window.Jupiter) { document.getElementById("swap-status").textContent = "Swap widget failed to load. Please refresh."; return; }
    window.Jupiter.init({
      displayMode: "integrated",
      integratedTargetId: "jupiter-plugin",
      containerStyles: { width: "100%", height: "600px", borderRadius: "14px", overflow: "hidden" },
      branding: { name: "GDR Swap", logoUri: new URL("assets/favicon.svg", location.href).href },
      formProps,
      onSuccess: ({ txid }) => console.log("Swap confirmed:", txid),
      onSwapError: ({ error }) => console.warn("Swap error:", error),
    });
  }
  if (document.readyState === "complete") start(); else window.addEventListener("load", start);
})();
