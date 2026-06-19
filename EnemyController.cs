using UnityEngine;

public class EnemyController : MonoBehaviour, IPoolableEnemy
{
    public EnemyStats enemyStats;

    private IDamageable enemyHealth;
    private FlowFieldEnemy flowFieldEnemy;

    public GameObject GameObject => gameObject;
    public string PoolKey => enemyStats.enemyName;

    private void Awake()
    {
        enemyStats = GetComponent<EnemyStats>();
        enemyHealth = GetComponent<IDamageable>();
        flowFieldEnemy = GetComponent<FlowFieldEnemy>();
    }

    public void Initialize(IFlowFieldReader flowfield, Transform player)
    {
        flowFieldEnemy.Initialize(flowfield, player);
    }

    public void OnSpawn(Vector3 position, Quaternion rotation)
    {
        transform.position = position;
        transform.rotation = rotation;
        enemyHealth.ResetHealth();
        gameObject.SetActive(true);
    }

    public void OnReturnToPool()
    {
        gameObject.SetActive(false);
    }

}